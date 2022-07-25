import React, { useState } from 'react';
import { Box, Button, Container, CssBaseline, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { useNavigate } from 'react-router-dom';

const Gallery = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [isUserLogged, ] = useState(
        useAppSelector((state) => state.auth.isLogged)
    );

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
                        <div>Gallery</div>
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