import React from 'react'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material';


export default function Layout() {
    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
            backgroundImage: 'url(/images/moviebackground.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <NavBar />
            <Box sx={{ flex: '1' }}>
                <Outlet />
            </Box>
            <Footer />
        </Box>
    )
}
