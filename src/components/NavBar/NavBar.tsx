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
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const pages = ['dashboard', 'asteroids', 'mars', 'earth'];

const NavBar = () => {
    // Temporal state just to show the login screen
    const [isUser, setIsUser] = useState(false);
    
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
        setIsUser(flag);
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
                                            console.log(page);
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
                                        console.log(page);
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
                                {isUser ? (
                                    <MenuItem
                                        key='logout'
                                        onClick={() => {
                                            handleCloseUserMenu(false);
                                            console.log('make logout');
                                        }}
                                    >
                                        <Typography textAlign="center">Log out</Typography>
                                    </MenuItem>
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
