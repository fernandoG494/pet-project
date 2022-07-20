import React, { useState } from 'react';
import AuthLayout from '../layouts/AuthLayout';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, Grid, IconButton, InputAdornment, TextField } from '@mui/material';
import * as constants from '../../helpers/RegularExpressions';

const RegisterPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    // console.log(import.meta.env.VITE_API_URL);

    const [fName, setFName] = useState('');
    const [sName, setSName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const checkEmail = (email: string) => {
        if (email.match(constants.emailRegex)) {
            return true;
        }
        return false;
    }

    const checkPassword = (password: string) => {
        if (password.match(constants.passwordRegex)) {
            return true;
        }
        return false;
    }

    function isButtonDisabled() {
        if(checkEmail(email) && checkPassword(password) && fName.length > 2 && sName.length > 2) {
            return true;
        }
        return false;
    }

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
                            onChange={(e) => setFName(e.target.value)}
                            autoComplete='off'
                            error={fName.length < 3}
                            helperText={fName.length < 3 ? 'first name must be at least 3 characters' : ''}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            id="lastName"
                            label='second name'
                            type='text'
                            placeholder='second name'
                            fullWidth
                            onChange={(e) => setSName(e.target.value)}
                            autoComplete='off'
                            error={sName.length < 3}
                            helperText={sName.length < 3 ? 'second name must be at least 3 characters' : ''}
                        />
                    </Grid>
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
                            id="password"
                            label='password'
                            type={showPassword ? 'text' : 'password'}
                            placeholder='password'
                            fullWidth
                            onChange={(e) => setPassword(e.target.value)}
                            error={!checkPassword(password)}
                            helperText={!checkPassword(password) ? 
                                'password must be at least 6 characters and contain at least one number and one special character' :
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
                                onClick={() => {
                                    console.log(fName, sName , email, password);
                                }}
                            >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </form>
        </AuthLayout>
    );
};

export default RegisterPage;