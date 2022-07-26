import React, { useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

interface InputProps {
    isUserLogged: boolean;
    pictureInfo: {
        url: string;
        title: string;
        explanation: string;
        date: string;
    };
};

const FavoriteButton = ({isUserLogged, pictureInfo}: InputProps) => {
    const excludedPicture = "Start by clicking the button above";

    return (
        <Tooltip
            title={'Add to gallery'}
        >
            <span>
                <IconButton
                    aria-label="Add to favorites"
                    disabled={!isUserLogged}
                    onClick={(e: any) => {
                        console.log('Added to favorites: ', pictureInfo);
                    }}
                >
                    <FavoriteBorderRoundedIcon style={{ color: 'gray' }}/>
                </IconButton>
            </span>
        </Tooltip>
    );
};

export default FavoriteButton;