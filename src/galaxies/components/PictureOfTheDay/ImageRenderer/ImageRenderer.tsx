import React, { useState } from 'react'
import {
    Box,
    Card,
    CardActions,
    CardContent,
    CardMedia,
    Typography
} from '@mui/material';
import FavoriteButton from '../../FavoriteButton/FavoriteButton';
import { useAppSelector } from '../../../../hooks/hooks';

interface InputProps {
    isUserLogged: boolean;
    pictureInfo: {
        url: string;
        title: string;
        explanation: string;
        date: string;
    };
};

const ImageRenderer = ({pictureInfo, isUserLogged}: InputProps) => {    
    let {url, title, explanation, date} = pictureInfo;

    if(pictureInfo.date === '') {
        url = 'https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/wff-2022-035-112.jpg';
        title = 'Start by clicking the button above';
        explanation = 'Start by selecting a date and clicking the button above';
        date = '';
    }

    return (
        <Card sx={{ display: 'flex'}}>
            <Box
                sx={{ display: 'flex', flexDirection: 'column' }} 
            >
                <CardContent sx={{ flex: '1 0 auto' }}>
                    <Typography component="div" variant="h6">
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" component="div">
                        {date}
                    </Typography>
                    <Typography variant="body2" component="p">
                        {explanation}
                    </Typography>
                </CardContent>

                <CardActions disableSpacing>

                <FavoriteButton
                    pictureInfo={{url: url, title: title, explanation: explanation, date: date}}
                    isUserLogged={isUserLogged}
                />
                </CardActions>
            </Box>
            
            <hr className='hidden-hr'/>

            <CardMedia
                component="img"
                sx={{ width: '50%' }}
                image={url}
                alt={title}
            />
        </Card>
    );
};

export default ImageRenderer;