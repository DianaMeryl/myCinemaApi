import React from 'react';
import { useState} from 'react';

export default function useFetchVideo(id) {

    const [videos, setVideos] = useState([]);

    const getVideos = async() => {
        try{
        await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=db50dff259f4d4212793f9fef20e8393&language=en-US`)
            .then(res => res.json())
            .then(json => setVideos(json.results))
        }
        catch(err){
            console.error(err);
        }
    }
return {videos, getVideos}
}
