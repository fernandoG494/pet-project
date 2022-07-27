import React from 'react';
import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import FavoriteButton from '../FavoriteButton/FavoriteButton';

function srcset(image: string, width: number, height: number, rows = 1, cols = 1) {
    return {
        src: `${image}?w=${width * cols}&h=${height * rows}&fit=crop&auto=format`,
        srcSet: `${image}?w=${width * cols}&h=${
            height * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
};

interface IImage {
    date: string;
    explanation: string;
    title: string;
    url: string;
    userId: string;
}

interface IImageElements {
    pictures: IImage[];
}

const ImageElements = ({pictures}: IImageElements) => {
    return (
        <ImageList
            sx={{
                width: '80vw',
                height: '80vh',
                // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                transform: 'translateZ(0)',
            }}
            rowHeight={200}
            gap={1}
        >
            {pictures.map((item) => {
                // const cols = Math.floor(Math.random() * (2 - 1 + 1) + 1);
                // const rows = Math.floor(Math.random() * (2 - 1 + 1) + 1);
                const cols = 1;
                const rows = 2;

                return (
                    <ImageListItem key={item.url} cols={cols} rows={rows}>
                        <img
                        {...srcset(item.url, 250, 200, rows, cols)}
                        alt={item.title}
                        loading="lazy"
                    />
                        <ImageListItemBar
                            sx={{
                                background:
                                'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
                                'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
                            }}
                            title={item.title}
                            position="top"
                            actionIcon={
                                <FavoriteButton pictureInfo={item}/>
                            }
                            actionPosition="left"
                        />
                    </ImageListItem>
                );
            })}
        </ImageList>
    );
};

export default ImageElements;