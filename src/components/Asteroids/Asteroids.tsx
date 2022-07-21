import React, {useEffect, useMemo} from 'react';
import axios from 'axios';
import { Grid, CssBaseline, Container, Box } from '@mui/material';
import AsteroidRender from '../AsteroidRender/AsteroidRender';

const Asteroids = () => {
    const {VITE_NEOWS_URL, VITE_API_KEY} = import.meta.env;
    const [asteroids, setAsteroids] = React.useState([]);
    

    return (
        <Grid
            container
            spacing={2}
            justifyItems="end"
            sx={{ mt: '10vh'}}
        >
            <CssBaseline />
            <Container>
                <Box sx={{ bgcolor: '#73777B', height: '100vh', marginTop: '3vh' }}>
                    <AsteroidRender asteroids={asteroids}/>
                </Box>
            </Container>
        </Grid>
    );
};

export default Asteroids;