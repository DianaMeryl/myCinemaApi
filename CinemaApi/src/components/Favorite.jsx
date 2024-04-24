import React from 'react';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {removeFavorite} from '../redux/actions';
import { useSelector, useDispatch } from 'react-redux';


export default function Favorite() {

    const [hoveredItemId, setHoveredItemId] = useState(null);

    const favoriteMovies = useSelector(state => state.favoriteMovies);
    const dispatch = useDispatch();
    console.log(favoriteMovies);
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

    const handleRemoveFavorite = (id) => {
        dispatch(removeFavorite(id));
    };


    return (
            
            <div style={{display:'flex', justifyContent: 'center', flexWrap:"wrap", gap:"35px", padding:"20px 55px"}}> 
                { favoriteMovies.map(item => (
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
            <Button onClick={() => handleRemoveFavorite(item.id)}>Remove
            </Button>
            </CardActions>
            </Card>    
        )) }
    </div>
    );
}
