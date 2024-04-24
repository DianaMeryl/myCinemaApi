import { SET_SEARCH_QUERY, SET_SEARCH_RESULTS, REMOVE_FAVORITE, ADD_FAVORITE, SET_GENRE, YEAR, SET_POPOVER_VALUE, SORT_MOVIES_BY_POPULARITY} from './actionTypes';

export const setSearchQuery = (text) => ({
    type: SET_SEARCH_QUERY,
    payload: text,
});

export const setSearchResults = (results) => ({
    type: SET_SEARCH_RESULTS,
    payload: results,
});
export const addFavorite = (movie) => ({
    type: ADD_FAVORITE, 
    payload: movie, 
});

export  const removeFavorite = (id) => ({
    type: REMOVE_FAVORITE, 
    payload: id,
});
export const  setGenreAction = (genre) => ({
    type: SET_GENRE,
    payload: genre,
});
export const  getProductionYear = (year) => ({
    type: YEAR,
    payload: year,
});
export const setPopoverValue = (value) => ({
    type: SET_POPOVER_VALUE,
    payload: value,
});
export const sortMoviesByPopularity = (sortedMovies) => ({
    type: SORT_MOVIES_BY_POPULARITY,
    payload: sortedMovies,
});


