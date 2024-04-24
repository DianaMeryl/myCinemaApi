import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import useSearch from '../hooks/useSearch';
import useFetchMovie from "../hooks/useFetchMovie";
import { Menu, MenuItem, Paper} from '@mui/material';
import { useState } from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {  setGenreAction } from '../redux/actions';
import {  getProductionYear } from '../redux/actions';
import { setPopoverValue } from '../redux/actions';
import { sortMoviesByPopularity } from '../redux/actions';
import HomeIcon from '@mui/icons-material/Home';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
    }));

    const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
            width: '20ch',
        },
        },
    },
    }));

    export default function NavBar() {
        const {movies} = useFetchMovie();
        const { searchQuery, handleChange, handleKeyPress } = useSearch();
        const [menuAnchorEl, setMenuAnchorEl] = useState(null);
        const [popoverAnchorEl, setPopoverAnchorEl] = useState(null);
        const navigate = useNavigate();
        const popoverValue = useSelector(state => state.popoverValue)
        const dispatch = useDispatch();
    

        function sortByPopularity() {
            const popularity_values = [];
            movies.forEach(movie => popularity_values.push(movie.popularity));
            popularity_values.sort((a, b) => a - b);
            popularity_values.reverse();
        
            const sortedMovies = popularity_values.map(popularity => {
                return movies.find(movie => movie.popularity === popularity);
            });
            dispatch(sortMoviesByPopularity(sortedMovies));
        }

        const handleGenreSelect = (genre) => {
            dispatch(setGenreAction (genre)); 
        };

        const handleYear = (year) => {
            dispatch( getProductionYear (year)); 
        };
    
        const handleMenu = (event) => {
            setMenuAnchorEl(event.currentTarget);
        };
    
        const handleCloseMenu = () => {
            setMenuAnchorEl(null);
        };

        const handleClosePopover = () => {
            setPopoverAnchorEl(null);
        };
    
        const handlePopoverOpen = (event, popover) => {
            setPopoverAnchorEl(event.currentTarget);
            dispatch(setPopoverValue(popover));
        };

        const handleGoToFavorite = () => {
            navigate('/favorite');
        };
        const handleGoToHome = () => {
            navigate('/');
        };
    
    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: '#000036' }}>
            <Toolbar>
            <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menur"
                onClick={handleMenu}
                sx={{ mr: 2 }}
            >
                <MenuIcon />
            </IconButton>
            <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, fontSize: '30px', color:'#e8f48c' }}
            >
                MoviePortal
            </Typography>
            <Button onClick={handleGoToHome}>Home<HomeIcon/></Button>
            <Button onClick={handleGoToFavorite}>My favorite list <FavoriteIcon/></Button>
            <Search>
                <SearchIconWrapper>
                <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                placeholder="Search…"
                inputProps={{
                type: "text",
                placeholder: "Search...",
                value: searchQuery,
                onChange: handleChange,
                onKeyDown: handleKeyPress
            }}
            />
            </Search>
        
            </Toolbar>
        </AppBar>
        <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleCloseMenu}
                PaperProps={{
                    component: Paper,
                    sx: {
                        backgroundColor: 'lightblue',
                        color:'#800080'
                    }
                }}
            >
                <MenuItem onClick={(event) => handlePopoverOpen(event, 1)}>Жанр</MenuItem>
                <MenuItem onClick={(event) => handlePopoverOpen(event, 2)}>Рік випуску</MenuItem>
                <MenuItem   onClick={sortByPopularity}>За популярністю</MenuItem>
            </Menu>
            <Popover
                anchorEl={popoverAnchorEl}
                open={Boolean(popoverAnchorEl)}
                onClose={handleClosePopover}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                PaperProps={{
                    component: Paper,
                    sx: {
                        backgroundColor: '#800080',
                        color:'lightblue'
                    }
                }}
            >
                <Box>
                    {popoverValue === 1 && (
                        <>
                            <MenuItem onClick={() => handleGenreSelect('All')}>Всі</MenuItem>
                            <MenuItem onClick={() => handleGenreSelect(35)}>Мультфільм</MenuItem>
                            <MenuItem onClick={() => handleGenreSelect(12)}>Пригоди</MenuItem>
                            <MenuItem onClick={() => handleGenreSelect(53)}>Бойовик</MenuItem>
                            <MenuItem onClick={() => handleGenreSelect(14)}>Драма</MenuItem>
                            <MenuItem onClick={() => handleGenreSelect(16)}>Комедія</MenuItem>
                        </>
                    )}
                    {popoverValue === 2 && (
                        <>
                            <MenuItem onClick={() => handleYear('All')}>Всі роки</MenuItem>
                            <MenuItem onClick={() => handleYear('2024')}>2024</MenuItem>
                            <MenuItem  onClick={() => handleYear('2023')}>2023</MenuItem>
                            <MenuItem  onClick={() => handleYear('2022')}>2022</MenuItem>
                        </>
                    )}
                </Box>
            </Popover>
        </Box>
    );
}