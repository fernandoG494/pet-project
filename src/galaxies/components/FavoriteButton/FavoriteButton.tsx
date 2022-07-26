import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import axios from 'axios';

interface InputProps {
    token: string;
    pictureInfo: {
        userId: string;
        url: string;
        title: string;
        explanation: string;
        date: string;
    };
};

const FavoriteButton = ({pictureInfo, token}: InputProps) => {
    const [isToken, setIsToken] = React.useState(() => {
        if(token.length > 0){
            return true;
        }else{
            return false;
        }
    });

    return (
        <Tooltip
            title={!token ? 'Initialize session to add to favorite' : 'Add to favorites'}
        >
            <span>
                <IconButton
                    disabled={isToken}
                    onClick={(e: any) => {
                        console.log('Added to favorites: ', pictureInfo);
                        const token = localStorage.getItem('token');
                        axios.post(`${import.meta.env.VITE_API_URL}/users/addFav`, pictureInfo, {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }).then(res => {
                                console.log(res);
                            }).catch(err => {
                                console.log(err);
                            });
                    }}
                >
                    <FavoriteBorderRoundedIcon style={{ color: 'gray' }}/>
                </IconButton>
            </span>
        </Tooltip>
    );
};

export default FavoriteButton;