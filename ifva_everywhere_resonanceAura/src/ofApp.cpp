#include "ofApp.h"

//--------------------------------------------------------------


int edgeList[6] = {4,100,6,8,12,100};
int sizeList[4] = {10,50,100,300};

int posXList[5] = {-180,0, 180, 360, 540};



void ofApp::setup(){
    

    bgColor.set(0,255);
    
    LEDTexture.allocate(ofGetWidth(), ofGetHeight(), GL_RGBA);
    
        
    for (int i=0; i<totalNumShape; i++){
        Shape temp;
        temp.init();
        shapes_L.push_back(temp);
        shapes_R.push_back(temp);
    }
    
    GeneratePattern();
    GeneratePos();
    
}

//--------------------------------------------------------------
void ofApp::update(){
    for (int i=0; i<totalNumShape; i++){
        shapes_L[i].update();
        shapes_R[i].update();
    }
    
    
    if (ofGetFrameNum()% 120 == 0){
        GeneratePos();
    }
    
    if (ofGetFrameNum()% 720 == 0){
        GeneratePattern();
    }
    
 }



void ofApp::GeneratePattern(){

    int randomEdge = (int)ofRandom(0,6);
    int randomSize = (int)ofRandom(0,4);
    
    for (int i=0; i<totalNumShape; i++){
        shapes_L[i]._edge = edgeList[randomEdge];
        shapes_R[i]._edge = edgeList[randomEdge];
        
        
        shapes_L[i]._weight = shapes_R[i]._weight = sizeList[ (int)ofRandom(0,4)];
        shapes_R[i]._weight = shapes_R[i]._weight = sizeList[ (int)ofRandom(0,4)];
        
        shapes_L[i]._size = sizeList[randomSize];
        shapes_R[i]._size = sizeList[randomSize];
    }
}

void ofApp::GeneratePos(){
    

  
    for (int i=0; i<totalNumShape; i++){
        
        
        shapes_L[i]._x = posXList[(int)ofRandom(0,5)];
        shapes_R[i]._x = posXList[(int)ofRandom(0,5)];
        
        shapes_L[i]._y= ofGetHeight()/2;
        shapes_R[i]._y= ofGetHeight()/2;
        
    }

}

//--------------------------------------------------------------
void ofApp::draw(){
    ofBackground(bgColor);
    
    LEDTexture.begin();
    ofClear(255,255,255, 0);
    
    
    ofSetColor(0,255);
    if(polyModeOdd){
        ofSetPolyMode(OF_POLY_WINDING_ODD);
        ofBeginShape();
    }
    
    
   
    for (int i=0; i<totalNumShape; i++){
        
        shapes_L[i].master = polyModeOdd;
        shapes_L[i].draw();
        ofNextContour(true);
        
        shapes_R[i].master = polyModeOdd;
        shapes_R[i].draw();
        ofNextContour(true);
    }
    
    
    if(polyModeOdd){
        ofEndShape();
    }
    
    LEDTexture.end();
    
    
    LEDTexture.draw(0,0);
    

}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){


    if(key=='r'){
        GeneratePattern();
    }
    
    if(key==' '){
        polyModeOdd=!polyModeOdd;
    }

}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){

}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
