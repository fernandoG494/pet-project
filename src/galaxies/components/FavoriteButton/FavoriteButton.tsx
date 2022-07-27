import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip, Typography } from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';

let error = 401;

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
    const [status, setStatus] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (token === null) {
            setIsToken(false);
        }else{
            setIsToken(true);
        }
    }, []);

    const email = localStorage.getItem('email')?.slice(1, -1);
    const queryData = { email, pictureInfo };

    useEffect(() => {
        if(!localStorage.getItem('token')){
            setIsFavorite(false);
        }else{
            const param = {
                url: pictureInfo.url,
                email: localStorage.getItem('email')?.slice(1, -1)
            };
            axios.post(`${import.meta.env.VITE_API_URL}/users/checkFav`, param)
            .then(res => {
                if(res.data.exists){
                    setIsFavorite(res.data.exists);
                }else{
                    setIsFavorite(false);
                }
            })
            .catch(err => {
                console.log(err);
                setIsFavorite(false);
            });
        }
    },[pictureInfo, queryData]);

    const checkFavorite = async (email: string, url: string) => {
        console.log("email: ", email, "url: ", url);
        try {
            const queryFav = { email, url };
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/checkFav`, queryFav);
        } catch (error) {
            console.log(error);
        }
    };
    
    return (
        <Tooltip
            title={isToken ? 'Add to favorites' : 'Initialize session to add to favorite'}
        >
            <span>
                <IconButton
                    disabled={(isToken) ? false : true}
                    onClick={() => {

                        if(isFavorite){
                            console.log("SE TIENE QUE BORRAR A LA VERGA");
                        }else{
                            axios.patch(`${import.meta.env.VITE_API_URL}/users/addFav`, queryData, {
                                headers: {
                                    Authorization: `Bearer ${token?.slice(1, -1)}`
                                }
                            }).then(res => {
                                console.log(res);
                                setIsFavorite(res.data.exists);
                            }).catch(err => {
                                console.log(err);
                                setStatus(err.response.status);
                            });
                        }
                    }}
                >
                    <FavoriteBorderRoundedIcon
                        style={isFavorite ? { color: 'red' } : { color: 'gray' }}
                    />
                </IconButton>
                {status.toString() === error.toString()
                    ? <Typography sx={{color: 'red'}}>
                        Session expired: please log out and log in again
                    </Typography>
                    : null}
            </span>
        </Tooltip>
    );
};

export default FavoriteButton;