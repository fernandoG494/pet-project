import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography,
    ImageList,
    ImageListItem,
    ListSubheader,
    ImageListItemBar,
    IconButton
} from '@mui/material';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';


interface MarsImagesProps {
    rover: string;
}

interface Image {
    camera: {
        full_name: string;
        id: number;
        name: string;
        rover_id: number;
    };
    earth_date: string;
    id: number;
    img_src: string;
    rover: {
        id: number;
        landing_date: string;
        launch_date: string;
        name: string;
        status: string;
    };
    sol: number;
}

const MarsImages = ({rover}: MarsImagesProps) => {
    const {VITE_ROVER_URL, VITE_API_KEY} = import.meta.env;
    
    if(rover.length === 0) {
        return(
            <Typography variant="h5" gutterBottom className='p-white'>
                Select a Rover Mission in the left selector.
            </Typography>
        );
    }
    
    useEffect(() => {
        axios.get(`${VITE_ROVER_URL}/${rover}/photos?api_key=${VITE_API_KEY}&sol=2000`)
        .then((response) => {
            setImages(response.data.photos);
        }).catch((error) => {
            console.log(error);
        })
    }, [rover]);

    const [images, setImages] = useState([]);

    return (
        <div>
            <ImageList sx={{ width: 500, height: 450 }}>
                <ImageListItem key="Subheader" cols={2}>
                    <ListSubheader component="div">December</ListSubheader>
                </ImageListItem>
                {images.map((image) => (console.log(1)))}
            </ImageList>
        </div>
    );
};

export default MarsImages;