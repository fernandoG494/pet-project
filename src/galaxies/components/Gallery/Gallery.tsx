import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Button, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ImageElements from './ImageElements';

const Gallery = () => {
    const navigate = useNavigate();
    const [isUserLogged, ] = useState(
        localStorage.getItem('email') !== null
    );

    const [pictures, setPictures] = useState([]);

    useEffect(() => {
        if(isUserLogged){
            const params = {
                email: localStorage.getItem('email')?.slice(1, -1)
            }
            axios.post(`${import.meta.env.VITE_API_URL}/users/getFavs`, params)
                .then(res => {
                    setPictures(res.data.user.favorites);
                }).catch(err => {
                    console.log(err)
                });
        }
    }, []);

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
                    {isUserLogged ? (
                        <ImageElements pictures={pictures}/>
                    ) :(
                        <Grid container spacing={3} direction="column" alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="h5" >
                                    You must be logged in to see this page
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Button variant="contained" color="primary" onClick={() => navigate('/auth/login')}>
                                    Login
                                </Button>
                            </Grid>
                        </Grid>
                    )}
                </Box>
            </Container>
        </div>
    );
};

export default Gallery