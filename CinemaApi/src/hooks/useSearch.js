import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchQuery } from '../redux/actions';
import { setSearchResults} from '../redux/actions';
import useFetchMovie from './useFetchMovie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function useSearch(){

    const { movies, loading } = useFetchMovie();

    const navigate = useNavigate();
    
    const searchQuery = useSelector(state => state.searchQuery);
    const searchResults = useSelector(state => state.searchResults);

    const dispatch = useDispatch(); 

    useEffect(() => {
        if (!loading && searchQuery !== '') { 
            handleSearch();
        }
    }, [loading]);

    const handleSearch = () => {
        dispatch(setSearchQuery(searchQuery)); 
        const searchWords = searchQuery.toLowerCase().split(" ");
        const filteredResults = movies.filter(item => {
            const title = item.original_title.toLowerCase();
            return searchWords.some(word => title.includes(word));
        }); 
        dispatch(setSearchResults(filteredResults));
        dispatch(setSearchQuery(''));
    };

    const handleChange = (event) => {
        dispatch(setSearchQuery(event.target.value)); 
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearch(); 
            navigate('/search-results'); 
        }
    };   
    return { searchQuery, searchResults, handleChange, handleSearch, handleKeyPress };
}



