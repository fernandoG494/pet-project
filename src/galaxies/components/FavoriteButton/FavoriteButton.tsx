import React from 'react';
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
    return (
        <Tooltip
            title={!isUserLogged ? 'Initialize session to add to favorite' : 'Add to favorites'}
        >
            <span>
                <IconButton
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