import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Typography,
    Grid,
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
    const [images, setImages] = useState([]);
    
    useEffect(() => {
        if(rover.length > 0){
            axios.get(`${VITE_ROVER_URL}/${rover}/photos?api_key=${VITE_API_KEY}&sol=2000`)
            .then((response) => {
                setImages(response.data.photos);
            }).catch((error) => {
                console.log(error);
            })
        }
    }, [rover]);

    return (
        <div>
            {rover.length === 0 ? (
                <Typography variant="h5" gutterBottom className='p-white'>
                    Select a Rover Mission in the selector.
                </Typography>
            ) : (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom className='p-white'>
                            {rover.toUpperCase()}
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <ImageList sx={{ width: '50vw', height: '100hv' }} cols={3}>
                            {images.map((image: Image) => (
                                <ImageListItem key={image.id}>
                                    <img
                                        src={image.img_src}
                                        alt={`${image.id}`}
                                        loading="lazy"
                                    />
                                    <ImageListItemBar
                                        title={image.camera.full_name}
                                        subtitle={image.earth_date}
                                        actionIcon={
                                            <IconButton
                                                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                aria-label={`info about ${rover}`}
                                            >
                                                <FavoriteBorderRoundedIcon />
                                            </IconButton>
                                        }
                                    />
                                </ImageListItem>
                            ))}
                        </ImageList>
                    </Grid>
                </Grid>
            )}
        </div>
    );
};

export default MarsImages;