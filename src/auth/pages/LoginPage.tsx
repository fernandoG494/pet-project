import React, { useState } from 'react';
import axios from 'axios';
import AuthLayout from '../layouts/AuthLayout';
import * as constants from '../../helpers/RegularExpressions';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Grid, TextField, Button, InputAdornment, IconButton } from '@mui/material';

interface IRequest {
    body: {
        email: string;
        password: string;
    },
};

const LoginPage = () => {
    const apiUrl = `${import.meta.env.VITE_API_URL}/auth/login`;

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const handleLogin = (userEmail: string, userPassword: string) => {
        const request: IRequest = {
            body: {
                email: userEmail,
                password: userPassword
            }
        };

        // axios.post(apiUrl)
        axios.post('http://localhost:3000/auth/login', request)
            .then((response) => {
                console.log("Response: ", response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const checkEmail = (email: string) => {
        if (email.match(constants.emailRegex)) {
            return true;
        }
        return false;
    }

    const isButtonDisabled = () => (checkEmail(email) && password.length > 2) ? true : false;

    return (
        <AuthLayout title="Login" hyperlink="Sign in" to='/auth/register'>
            <form>
                <Grid container>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            id="email"
                            label='email'
                            type='email'
                            placeholder='name@email.com'
                            fullWidth
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete='off'
                            error={!checkEmail(email)}
                            helperText={!checkEmail(email) ? 'email is not valid' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='password'
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
                                    >
                                      {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                  </InputAdornment>
                                )
                            }}
                        />
                    </Grid>

                    <Grid
                        container
                        spacing={ 2 }
                        sx={{ mb: 2, mt: 1 }}
                    >
                        <Grid item xs={ 12 } sm={ 12 }>
                            <Button
                                variant='contained'
                                fullWidth
                                disabled={!isButtonDisabled()}
                                onClick={() => {
                                    handleLogin(email, password);
                                }}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};

export default LoginPage;