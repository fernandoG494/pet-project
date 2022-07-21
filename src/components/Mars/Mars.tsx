import React from 'react';
import { Box, Container, CssBaseline } from '@mui/material';
import Rovers from '../Rovers/Rovers';

const Mars = () => {
    return (
        <div>
            <CssBaseline />
            <Container>
                <Box sx={{ bgcolor: '#73777B', height: '100vh', marginTop: '13vh' }}>
                    <Rovers />
                </Box>
            </Container>
        </div>
    );
};

export default Mars;