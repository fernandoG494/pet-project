import React, {ReactNode} from 'react';
import { Grid, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
    children: ReactNode;
    title: string;
    hyperlink?: string;
    to: string;
}

const AuthLayout = ({children, title, hyperlink, to}: Props) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                minHeight: '100vh',
                backgroundColor: '#3f51b5',
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
                    width: { sm: 450 },
                }}
            >
                <Typography variant="h6">{ title }</Typography>
                { children }

                {/* Here goes the last part */}
                <Grid
                    item
                >
                    <Link
                        color='inherit'
                        to={ to }
                        component={
                            RouterLink
                        }
                    >
                        { hyperlink }
                    </Link>
                </Grid>

                <Grid
                    item
                    justifyContent='end'
                    xs={ 12 } sm={ 6 }
                    sx={{
                        mt: 2,
                        justifyContent: 'end',
                    }}
                >
                    <Link
                        color='inherit'
                        to='/'
                        component={ RouterLink }
                    >
                        Back
                    </Link>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AuthLayout;