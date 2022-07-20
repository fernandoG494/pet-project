import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import DaySearcher from '../DaySearcher/DaySearcher';

const PictureOfTheDay = () => {
    console.log(import.meta.env.VITE_APOD_URL);

    return (
        <div>
            <CssBaseline />
            <Container>
                <Box sx={{ bgcolor: '#73777B', height: '100vh', marginTop: '13vh' }}>
                    <DaySearcher />
                </Box>
            </Container>
        </div>
    );
};

export default PictureOfTheDay;
