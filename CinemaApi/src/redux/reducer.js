import React from 'react';
import { SET_SEARCH_QUERY, SET_SEARCH_RESULTS, ADD_FAVORITE, REMOVE_FAVORITE, SET_GENRE, YEAR, SET_POPOVER_VALUE, SORT_MOVIES_BY_POPULARITY } from './actionTypes';

const initialState = {
    movies: [],
    searchQuery: '', 
    searchResults: [], 
    favoriteMovies: [],
    selectedGenre: 'All',
    prodYear: 'All',
    popoverValue: null,
};


export default function movieReducer(state=initialState, action) {

    switch(action.type){
    case SET_SEARCH_QUERY:
        return {
            ...state,
            searchQuery: action.payload,
        };
    case SET_SEARCH_RESULTS:
        return {
            ...state,
            searchResults: action.payload,
        };
        case ADD_FAVORITE:
            return {
            ...state,
            favoriteMovies: [...state.favoriteMovies, action.payload],
        };
        case REMOVE_FAVORITE:
        return {
            ...state,
            favoriteMovies: state.favoriteMovies.filter(movie => movie.id !== action.payload),
            };
        case SET_GENRE:
            return {
            ...state,
            selectedGenre: action.payload, 
            };
        case YEAR:
            return {
            ...state,
            prodYear: action.payload, 
            };
        case SET_POPOVER_VALUE:
            return {
                ...state,
                popoverValue: action.payload,
            };
        case SORT_MOVIES_BY_POPULARITY:
            return {
                ...state,
                sortedMoviesByPopularity: action.payload,
            };
        default:
            return state;
    }
}

