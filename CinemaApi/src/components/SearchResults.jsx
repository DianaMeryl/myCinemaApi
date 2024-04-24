import React from 'react'
import useSearch from '../hooks/useSearch';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {addFavorite} from '../redux/actions';
import {removeFavorite} from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';
import '../index.css';

export default function SearchResults() {

    const {  searchResults } = useSearch();
    const navigate = useNavigate();
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const favoriteMovies = useSelector(state => state.favoriteMovies);
    const [clickedCards, setClickedCards] = useState({});
    const dispatch = useDispatch();

    useEffect(() => {
        const initialClickedCards = {};
        favoriteMovies.forEach(movie => {
            initialClickedCards[movie.id] = true;
        });
        setClickedCards(initialClickedCards);
    }, [favoriteMovies]);


    const handleFavoriteClick = (movie) => {
        if (clickedCards[movie.id]) {
            dispatch(removeFavorite(movie.id)); 
        } else {
            dispatch(addFavorite(movie)); 
        }
    };

    const handleGoToHomePage = () => {
        navigate('/');
    };

    const loadVideo = (videoId) => {
        const newWindow = window.open('', '_blank');
        newWindow.location = `${window.location.origin}/watch-video/${videoId}`;
    };

    const handleMouseEnter = (itemId) => {

        setHoveredItemId(itemId);
    };
    
    const handleMouseLeave = () => {
        setHoveredItemId(null);
    };

    return (
        <div style={{display:'flex', justifyContent: 'center', flexWrap:"wrap", gap:"35px", padding:"20px 55px"}}> 
        { searchResults.map(item => (
        <Card key={item.id} sx={{ width: 400, height: 430, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <CardMedia
            sx={{position: 'relative', height: 370, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', 
            '&:hover #move': {
                animation: hoveredItemId === item.id ? 'animmove 1s ease-out': 'none'
            } }}
            image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            title={item.original_title}
            onMouseEnter={() => handleMouseEnter(item.id)} 
            onMouseLeave={handleMouseLeave}
        > <p id='move' style={{ visibility: hoveredItemId === item.id ? 'visible' : 'hidden' }}>
        {item.overview}
    </p>
    </CardMedia>
    <CardContent>
        <Typography gutterBottom variant="h5" component="div"  sx={{ fontSize: '16px', marginBottom: 0 }}>
        {item.original_title}
        </Typography>
    </CardContent>
        <CardActions sx={{display:'flex', justifyContent:'space-between' }}>
        <Button onClick={handleGoToHomePage} size="large" sx={{color:'#0a7e8c'}}><ArrowBackIcon/></Button>
        <Button onClick={() => loadVideo(item.id)} variant="contained" size="small">Трейлер</Button>
        <Button onClick={() => handleFavoriteClick(item)}>
                {clickedCards[item.id] ? <FavoriteIcon style={{ color:'red'}}/> : <FavoriteBorderIcon style={{ color: 'black'}}/>}
            </Button>
        </CardActions>
        </Card>    
    )) }
</div>
    );
}
