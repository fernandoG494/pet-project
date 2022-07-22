import React, { useState } from 'react';
import { Grid, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import AuthLayout from '../layouts/AuthLayout';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import * as constants from '../../helpers/RegularExpressions';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
                                    console.log(email, password);
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