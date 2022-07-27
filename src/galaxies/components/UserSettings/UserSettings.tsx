import React, { useEffect, useState } from 'react';
import { 
    Box,
    Button,
    Container,
    CssBaseline,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    TextField,
    Typography
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IUser {
    avatar: string;
    createdAt: string;
    email: string;
    favorites: any;
    firstName: string;
    lastName: string;
    role: string;
    updatedAt: string;
};

const initialValues: IUser = {
    avatar: '',
    createdAt: '',
    email: '',
    favorites: [],
    firstName: '',
    lastName: '',
    role: '',
    updatedAt: ''
};

interface IDialogProps {
    handleClickOpen: () => void;
    handleClose: () => void;
    open: boolean;
}

const UserSettings = () => {
    const navigate = useNavigate();
    const [user, setUser] = React.useState(initialValues);
    const [isUserLogged, setIsUserLogged] = React.useState(
        localStorage.getItem('email') !== null
    );

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        const localUser = localStorage.getItem('email')?.slice(1, -1);
        if(localUser){
            const params = {
                email: localUser
            };
            axios.post(`${import.meta.env.VITE_API_URL}/users/getUserByEmail`, params)
                .then(res => {
                    setUser(res.data.user);
                    setIsUserLogged(true);
                }).catch(err => {
                    setIsUserLogged(false);
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
                        <Grid container direction='row' spacing={3}>
                            <Grid item xs={12}>
                                <Typography variant='h6' align='left'>
                                    User Settings
                                </Typography>
                                <hr />
                                <Grid container direction='row' spacing={3}>
                                    <Grid item sx={{ sm:12, md:6, ml:3 }}>
                                        <Grid container direction='row' spacing={2}>
                                            <Grid item xs={4}>
                                                <Typography variant='body1'>First name:</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                            <TextField
                                                disabled
                                                hiddenLabel
                                                value={user.firstName}
                                                variant='filled'
                                                size='small'
                                            />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sx={{ sm:12, md:6, ml:3 }}>
                                        <Grid container direction='row' spacing={2}>
                                            <Grid item xs={4}>
                                                <Typography variant='body1'>Last name:</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                            <TextField
                                                disabled
                                                hiddenLabel
                                                value={user.lastName}
                                                variant='filled'
                                                size='small'
                                            />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item sx={{ sm:12, md:6, ml:3 }}>
                                        <Grid container direction='row' spacing={2}>
                                            <Grid item xs={4}>
                                                <Typography variant='body1'>Email:</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                            <TextField
                                                disabled
                                                hiddenLabel
                                                value={user.email}
                                                variant='filled'
                                                size='small'
                                            />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid> 

                            <Grid item xs={12}>
                                <Typography variant='h6' align='left'>
                                    Gallery info
                                </Typography>
                                <hr />
                                <Grid container direction='row' spacing={3}>
                                    <Grid item xs={6}>
                                        <Grid container direction='row' spacing={2}>
                                            <Grid item xs={4}>
                                                <Typography variant='body1'>Gallery elements:</Typography>
                                            </Grid>
                                            <Grid item xs={8}>
                                                {user.favorites.length}
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Button
                                            variant='contained'
                                            onClick={() => {
                                                navigate('/gallery');
                                            }}
                                        >
                                            Go to gallery
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant='h6' align='left' sx={{ color: 'red' }}>
                                    Danger Zone
                                </Typography>
                                <hr />
                                <Grid container direction='row' spacing={3}>
                                    <Grid item xs={6}>
                                        <div>
                                            <Button
                                                onClick={handleClickOpen}
                                                color="error"
                                                variant="contained"
                                            >
                                                Delete account
                                            </Button>
                                            <Dialog
                                                open={open}
                                                onClose={handleClose}
                                                aria-labelledby="alert-dialog-title"
                                                aria-describedby="alert-dialog-description"
                                            >
                                                <DialogTitle id="alert-dialog-title">
                                                    {"Delete account?"}
                                                </DialogTitle>
                                                <DialogContent>
                                                    <DialogContentText id="alert-dialog-description">
                                                        This action will delete your account and all your data.
                                                        This is irreversible.
                                                    </DialogContentText>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button
                                                        onClick={handleClose}
                                                        variant="contained"
                                                        color="primary"
                                                    >
                                                        Disagree
                                                    </Button>
                                                    <Button
                                                        onClick={() => {
                                                            axios.post(`${import.meta.env.VITE_API_URL}/users/removeUser`, 
                                                                {email: localStorage.getItem('email')?.slice(1, -1)}
                                                            ).then(res => {
                                                                localStorage.clear();
                                                                navigate('/');
                                                            }).catch(err => {
                                                                console.log(err);
                                                            });
                                                            handleClose();
                                                        }}
                                                        autoFocus
                                                        variant="contained"
                                                        color="error"
                                                    >
                                                        Agree
                                                    </Button>
                                                </DialogActions>
                                            </Dialog>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    ) : (
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

export default UserSettings;