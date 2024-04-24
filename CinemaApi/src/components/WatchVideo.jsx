import React from 'react';
import useFetchVideo from "../hooks/useFetchVideo";
import YouTube from 'react-youtube';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function WatchVideo() {

    const { videoId } = useParams();

    const {videos, getVideos} = useFetchVideo(videoId);

    useEffect(() => {
        getVideos();
    }, [videoId]);

  return (
    <div style={{ width: '100%', height: '100%', display:'flex', justifyContent:'center' }}>
       {videos.length > 0 && (
                <YouTube videoId={videos[0].key}  opts={{ width: '700px', height: '400px',  playerVars: {
                    autoplay: 1,
                }, }} />
            )}
    </div>
  )
}
