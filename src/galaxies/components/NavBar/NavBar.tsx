import React, {useState} from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
    Link,
    Grid,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../hooks/hooks';
import { logout } from '../../../store/slices/auth/authSlice';
import { ConstructionOutlined } from '@mui/icons-material';

const pages = ['dashboard', 'mars'];

const NavBar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleLocalStage = () => {
        const localStage: any = localStorage.getItem('isLogged');
        const parsedStage: any = JSON.parse(localStage);
        
        if(parsedStage.isLogged) {
            return true;
        }
        return false;
    };

    const [isUserLogged, setIsUserLogged] = useState(handleLocalStage());

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = (flag: boolean) => {
        setAnchorElUser(null);
    };

    const handleLogOut = () => {
        dispatch(logout({
            isLogged: false,
            token: '',
            user: {
                id: '',
                email: '',
                firstName: '',
                lastName: '',
                avatar: '',
                role: ''
            }
        }));
        // LOCAL HOST LOG OUT
        localStorage.removeItem('data');
        localStorage.removeItem('isLogged');
        localStorage.setItem('isLogged', JSON.stringify({isLogged: false}));
        setTimeout(() => {
            navigate('/dashboard', {
                replace: true,
            });
        }, 0);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            GALAXIES
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem
                                        key={page}
                                        onClick={() => {
                                            handleCloseNavMenu();
                                        }}
                                    >
                                        <Link
                                            color='inherit'
                                            to={`/${page}`}
                                            component={ RouterLink }
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Typography textAlign="center">{page}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            GALAXIES
                        </Typography>
                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                    }}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    <Link
                                        color='inherit'
                                        to={`/${page}`}
                                        component={ RouterLink }
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Typography textAlign="center">{page}</Typography>
                                    </Link>
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {isUserLogged === true ? (
                                    <Grid container direction="column">
                                        <Grid item>
                                            <MenuItem
                                                key='gallery'
                                                onClick={() => {
                                                    handleCloseUserMenu(false);
                                                    navigate('/gallery');
                                                }}
                                            >
                                                <Typography textAlign="center">Gallery</Typography>
                                            </MenuItem>
                                        </Grid>
                                        <Grid item>
                                            <MenuItem
                                                key='logout'
                                                onClick={() => {
                                                    handleCloseUserMenu(false);
                                                    handleLogOut();
                                                }}
                                            >
                                                <Typography textAlign="center">Log out</Typography>
                                            </MenuItem>
                                        </Grid>
                                    </Grid>
                                ) : (
                                    <MenuItem 
                                        key='login' 
                                        onClick={() => {
                                            handleCloseUserMenu(true);
                                        }}
                                    >
                                        <Link
                                            color='inherit'
                                            to='/auth/login'
                                            component={ RouterLink }
                                        >
                                            <Typography textAlign="center">Log in</Typography>
                                        </Link>
                                    </MenuItem>
                                )}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
};

export default NavBar;
