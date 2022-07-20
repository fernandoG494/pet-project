import React from 'react';
import { Grid, CssBaseline, Container, Box } from '@mui/material';

const Asteroids = () => {
    return (
        <Grid
            container
            spacing={2}
            justifyItems="end"
            sx={{ mt: '10vh'}}
        >
            <CssBaseline />
            <Container>
                <Box sx={{ bgcolor: '#73777B', height: '100vh', marginTop: '13vh' }}>
                    
                </Box>
            </Container>
        </Grid>
    );
};

export default Asteroids;