import axios from 'axios';
import React, { useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import { useNavigate } from 'react-router-dom';
import * as constants from '../../helpers/RegularExpressions';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Button,
    CircularProgress,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

interface IUser {
    fName: string;
    sName: string;
    email: string;
    password: string;
};

const RegisterPage = () => {
    const navigate = useNavigate();

    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [userExist, setUserExist] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [firstName, setFirstName] = useState('');
    const [secondName, setSecondName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const checkEmail = (email: string) => {
        if (email.match(constants.emailRegex)) {
            return true;
        }
        return false;
    };

    const checkPassword = (password: string) => {
        if (password.match(constants.passwordRegex)) {
            return true;
        }
        return false;
    };

    function isButtonDisabled() {
        if(checkEmail(email) && checkPassword(password) && firstName.length > 2 && secondName.length > 2) {
            return true;
        }
        return false;
    };

    function handleRegister() {
        setIsLoading(true);
        
        var newUser = {
            firstName: firstName,
            lastName: secondName,
            email: email,
            password: password,
            createdAt: new Date(),
            updatedAt: new Date(),
            avatar: 'https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png',
            role: 'user',
            favorites: []
        };

        axios.post(`${import.meta.env.VITE_API_URL}/users/`, newUser)
            .then(res => {
                setStatus('success');
                setIsLoading(false);
                setTimeout(() => {
                    navigate('/auth/login', {
                        replace: true,
                    });
                }, 2000);
            }).catch(err => {
                setStatus('error');
                if(err.response.status === 409) {
                    setUserExist(true);
                }
            });
    };

    return (
        <AuthLayout title='Register' hyperlink="Log in" to='/auth/login'>
            <form>
                <Grid container>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            id="firstName"
                            label='first name'
                            type='text'
                            placeholder='first name'
                            fullWidth
                            onChange={(e: any) => setFirstName(e.target.value)}
                            autoComplete='off'
                            error={firstName.length < 3}
                            helperText={firstName.length < 3 ? 'first name must be at least 3 characters' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            id="lastName"
                            label='second name'
                            type='text'
                            placeholder='second name'
                            fullWidth
                            onChange={(e: any) => setSecondName(e.target.value)}
                            autoComplete='off'
                            error={secondName.length < 3}
                            helperText={secondName.length < 3 ? 'second name must be at least 3 characters' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            id="email"
                            label='email'
                            type='email'
                            placeholder='name@email.com'
                            fullWidth
                            onChange={(e: any) => setEmail(e.target.value)}
                            autoComplete='off'
                            error={!checkEmail(email)}
                            helperText={!checkEmail(email) ? 'email is not valid' : ''}
                        />
                    </Grid>

                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            id="password"
                            label='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='password'
                            fullWidth
                            onChange={(e: any) => setPassword(e.target.value)}
                            error={!checkPassword(password)}
                            helperText={!checkPassword(password) ? 
                                'password must be at least 8 characters and contain at least one number and one special character' :
                                 ''
                            }
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
                                onClick={handleRegister}
                            >
                                Register
                            </Button>
                        </Grid>
                        {(isLoading && status === '') ? (
                            <Grid
                                item
                                xs={ 12 }
                                sm={ 12 }
                                sx={{ mt: 1, textAlign: 'center' }}
                            >
                                <CircularProgress />
                            </Grid>
                        ) : ((status === 'success') ? (
                            <Grid
                                item
                                xs={ 12 }
                                sm={ 12 }
                                sx={{
                                    textAlign: 'center',
                                }}
                            >
                                <CheckCircleOutlineIcon color='success'/>
                                <Typography>
                                    User registered successfully
                                </Typography>
                            </Grid>
                        ) : ((status === 'error') ? (
                            <Grid
                                item
                                xs={ 12 }
                                sm={ 12 }
                                sx={{
                                    textAlign: 'center',
                                }}
                            >
                                <ErrorOutlineIcon color='error'/>
                                <Typography
                                    color='error'
                                >
                                    {userExist ? 'User already exists' : 'Error registering user'}
                                </Typography>
                            </Grid>
                        ) : (
                            ''
                        )))}
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;