import React from 'react';
import { Grid, Typography, TextField, Button, Link } from '@mui/material';
import { Google } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const LoginPage = () => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                minHeight: '100vh',
                backgroundColor: 'primary.main',
                padding: 4,
            }}
        >
            <Grid
                item
                className='login-shadow'
                xs={3}
                sx={{
                    backgroundColor: 'white',
                    padding: 3,
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6">
                    Login
                    <form>
                        <Grid container>
                            <Grid item xs={12} sx={{mt: 2}}>
                                <TextField
                                    label='email'
                                    type='email'
                                    placeholder='name@mail.com'
                                    fullWidth
                                />
                            </Grid>
                            <Grid item xs={ 12 } sx={{ mt: 2 }}>
                                <TextField
                                    label='password'
                                    type='password'
                                    placeholder='password'
                                    fullWidth
                                >
                                </TextField>
                            </Grid>

                            <Grid
                                container
                                spacing={ 2 }
                                sx={{ mb: 2, mt: 1 }}
                            >
                                <Grid item xs={ 12 } sm={ 12 }>
                                    <Button variant='contained' fullWidth>
                                        Login
                                    </Button>
                                </Grid>
                            </Grid>

                            <Grid
                                container
                                direction='row'
                                justifyContent='end'
                            >
                                <Link
                                    color='inherit'
                                    to='/auth/register'
                                    component={
                                        RouterLink
                                    }
                                >
                                    Sign In
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </Typography>
            </Grid>
        </Grid>
    );
};

export default LoginPage;