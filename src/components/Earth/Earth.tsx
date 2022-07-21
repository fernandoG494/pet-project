import React from 'react';
import {
    Box,
    Container,
    CssBaseline
} from '@mui/material';

const Earth = () => {
    return (
        <div>
            <CssBaseline />
            <Container>
                <Box
                    sx={{
                        bgcolor: '#73777B',
                        height: '100vh',
                        marginTop: '13vh'
                    }}
                >
                    Earth
                </Box>
            </Container>
        </div>
    );
};

export default Earth;