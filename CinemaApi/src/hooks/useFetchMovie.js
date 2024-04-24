import React from 'react'
import { useState, useEffect } from 'react';


export default function useFetchMovie() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);

    const getMovie = async () => {
        try {
            const response = await fetch('https://api.themoviedb.org/3/discover/movie?api_key=db50dff259f4d4212793f9fef20e8393&language=uk-UA');
            const data = await response.json();
            setMovies(data.results);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getMovie();
    }, []); 

    return { movies, loading, getMovie }; 
}

