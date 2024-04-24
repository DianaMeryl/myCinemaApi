import React from 'react';
import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import useFetchMovie from "../hooks/useFetchMovie";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {addFavorite} from '../redux/actions';
import {removeFavorite} from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';

export default function MainComponent(){

    const {movies} = useFetchMovie();
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const favoriteMovies = useSelector(state => state.favoriteMovies);
    const [clickedCards, setClickedCards] = useState({});
    const dispatch = useDispatch();

    const selectedGenre = useSelector(state => state.selectedGenre);
    const production = useSelector(state => state.prodYear);
    const popoverValue = useSelector(state => state.popoverValue)

    const getFilteredMovies = () => {
        switch (popoverValue) {
            case 1: 
                return selectedGenre === 'All' ? movies : movies.filter(movie => movie.genre_ids.includes(selectedGenre));
            case 2: 
                return production === 'All' ? movies : movies.filter(movie => movie.release_date.includes(production));
            default:
                return movies; 
        }
    };
    
    useEffect(() => {
        const initialClickedCards = {};
        favoriteMovies.forEach(movie => {
            initialClickedCards[movie.id] = true;
        });
        setClickedCards(initialClickedCards);
    }, [favoriteMovies]);


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


    const handleFavoriteClick = (movie) => {
        if (clickedCards[movie.id]) {
            dispatch(removeFavorite(movie.id)); 
        } else {
            dispatch(addFavorite(movie)); 
        }
    };

    const filteredMovies = getFilteredMovies();

    return (
            
            <div style={{display:'flex', justifyContent: 'center', flexWrap:"wrap", gap:"35px", padding:"20px 55px"}}> 
                { filteredMovies.map(item => (
                <Card key={item.id} sx={{ width: 230, height: 420, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} >
                <CardMedia
                    sx={{position: 'relative', height: 300, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }}
                    image={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                    title={item.original_title}
                    onMouseEnter={() => handleMouseEnter(item.id)} 
                    onMouseLeave={handleMouseLeave}
                >
                {hoveredItemId === item.id && (
                <div
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '95%',
                        height: '95%',
                        margin:5,
                        background: 'rgba(54,117,136, 0.9)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'justify',
                    }}
                >
                    <p>{item.overview}</p>
                </div>
            )}
            </CardMedia>
            <CardContent>
                <Typography gutterBottom variant="h5" component="div"  sx={{ fontSize: '16px', marginBottom: 0 }}>
                {item.original_title}
                </Typography>
            </CardContent>
            <CardActions sx={{display:'flex', justifyContent:'space-between' }}>
            <Button onClick={() => loadVideo(item.id)}>Трейлер</Button>
            <Button onClick={() => handleFavoriteClick(item)}>
                {clickedCards[item.id] ? <FavoriteIcon style={{ color:'red'}}/> : <FavoriteBorderIcon style={{ color: 'black'}}/>}
            </Button>
            </CardActions>
            </Card>    
        )) }
    </div>
    );
}

