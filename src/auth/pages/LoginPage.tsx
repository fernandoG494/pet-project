import axios from 'axios';
import { useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import * as constants from '../../helpers/RegularExpressions';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Grid,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    CircularProgress,
    Typography
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useAppDispatch } from '../../hooks/hooks';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { login } from '../../store/slices/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [status, setStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const checkEmail = (email: string) => {
        if (email.match(constants.emailRegex)) {
            return true;
        };
        return false;
    };

    const isButtonDisabled = () => 
        (checkEmail(email) && password.length > 2) 
            ? true 
            : false;

    const handleLogin = (userEmail: string, userPassword: string) => {
        setIsLoading(true);

        const data = {
            email: userEmail,
            password: userPassword
        };

        axios.post(`${import.meta.env.VITE_API_URL}/auth/login/`, data)
            .then(res => {
                setStatus('success');
                setIsLoading(false);
                dispatch(login({
                    isLogged: true,
                    user: res.data.user
                }));
                // LOCAL STORAGE IS HERE
                console.log("Response => ", res);
                localStorage.setItem('token', JSON.stringify(res.data.user.token));
                setTimeout(() => {
                    navigate('/', {
                        replace: true,
                    });
                }, 2000);
            }).catch(err => {
                console.log(err);
                setStatus('error');
                setIsLoading(false);
            });
    };

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
                            onChange={(e: any) => setEmail(e.target.value)}
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
                            onChange={(e: any) => setPassword(e.target.value)}
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
                                    User logged successfully
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
                                    Error trying to login.
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

export default LoginPage;