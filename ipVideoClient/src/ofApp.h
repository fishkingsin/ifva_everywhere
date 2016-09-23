#pragma once

#include "ofMain.h"
#include "ofxXmlSettings.h"
#include "IPVideoGrabber.h"
#include "MyApa102.h"
using namespace ofx;


class ofApp : public ofBaseApp{
    
public:
    void setup();
    void exit();
    void update();
    void draw();
    
    void keyPressed(int key);
    void keyReleased(int key);
    void mouseMoved(int x, int y );
    void mouseDragged(int x, int y, int button);
    void mousePressed(int x, int y, int button);
    void mouseReleased(int x, int y, int button);
    void mouseEntered(int x, int y);
    void mouseExited(int x, int y);
    void windowResized(int w, int h);
    void dragEvent(ofDragInfo dragInfo);
    void gotMessage(ofMessage msg);
    std::vector<std::shared_ptr<Video::IPVideoGrabber>> grabbers;
    ofFbo LEDTexture;
    MyApa102 myApa102;
};
