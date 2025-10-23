import React, { useEffect, useRef } from "react";
import BreadCrumb from "Common/BreadCrumb";


declare global {
  interface Window {
    Plyr: any; // Plyr will be exposed as a global on window by CDN script
  }
}

const VideoPlayer = () => {

    const videoRef = useRef(null);
    const playerRef = useRef(null);
    

    // Use window.Plyr if you need the instance, fallback to null
    useEffect(() => {
        if (window.Plyr && videoRef.current && !playerRef.current) {
        playerRef.current = new window.Plyr(videoRef.current, {
            // options
        });
        }
        return () => {
        if (playerRef.current) {
            playerRef.current.destroy();
            playerRef.current = null;
        }
        };
    }, []);

  

    return (
        <div className="container-fluid group-data-[content=boxed]:max-w-boxed mx-auto">
            <BreadCrumb title="Video Player" pageTitle="Plugins" />

            <div>
                <div className="grid grid-cols-1 gap-x-5 xl:grid-cols-2">
                    <div className="card">
                        <div className="card-body">
                            <h6 className="mb-4 text-gray-800 text-15 dark:text-white">Preview Video Player</h6>
                            <video ref={videoRef} controls>
                                <source src="https://cdn.plyr.io/static/blank.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VideoPlayer;

