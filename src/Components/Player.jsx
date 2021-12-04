import React, { useState } from 'react';
import YouTube from 'react-youtube';

function Player({videoUrl, isViewed}) {
    const [playBackDuration, setPlayBackDuration] = useState(0);
    
    const urlArray = videoUrl.split("/");
    const videoId = urlArray[urlArray.length-1];
    const opts={
        height: '300',
        width: '500',
    };
    
    function _onStateChange (e){
        const currentTime = e.target.getCurrentTime()
        const duration = currentTime - playBackDuration;
        console.log(e.target);
        console.log(currentTime);
        console.log(duration);
        if(duration > 10 ) {
            isViewed(true);
            return;
        }
        setPlayBackDuration(currentTime);
    }
    return (
        <div>
           return <YouTube videoId={videoId} opts={opts} onStateChange={_onStateChange}  />;
        </div>
    );
}

export default Player;