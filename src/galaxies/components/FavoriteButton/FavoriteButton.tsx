import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import axios from 'axios';

interface InputProps {
    pictureInfo: {
        userId: string;
        url: string;
        title: string;
        explanation: string;
        date: string;
    };
};

const FavoriteButton = ({pictureInfo}: InputProps) => {
    const token = localStorage.getItem('token');
    const [isToken, setIsToken] = useState(false);

    useEffect(() => {
        if (token === null) {
            setIsToken(false);
        }else{
            setIsToken(true);
        }
    }, []);

    const email = localStorage.getItem('email')?.slice(1, -1);

    const queryData = {
        email,
        pictureInfo
    };

    console.log(queryData);
    return (
        <Tooltip
            title={isToken ? 'Add to favorites' : 'Initialize session to add to favorite'}
        >
            <span>
                <IconButton
                    disabled={isToken ? false : true}
                    onClick={(e: any) => {
                        console.log('Added to favorites: ', queryData);
                        axios.patch(`${import.meta.env.VITE_API_URL}/users/addFav`, queryData, {
                            headers: {
                                Authorization: `Bearer ${token?.slice(1, -1)}`
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