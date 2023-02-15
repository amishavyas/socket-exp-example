import stim from "./images/seq1_comb1.mp4";
import React from "react";

function Video(props) {
    
    const showEndTime = () => {
        console.log('ended',Date.now()); 
    }

    const showStartTime = () => {
        console.log('started',Date.now()); 
    }
    
    return (
        <div>
            <video autoPlay onPlay={showStartTime}  onEnded={showEndTime}>
                <source src={stim} type="video/mp4" />
            </video>
        </div>
    );
}

export default Video;
