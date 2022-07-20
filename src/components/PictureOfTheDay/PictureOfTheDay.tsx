import React, { useState } from 'react';
import { Box, CssBaseline } from '@mui/material';
import { Container } from '@mui/system';
import DaySearcher from '../DaySearcher/DaySearcher';
import ImageRenderer from '../ImageRenderer/ImageRenderer';

type pictureInfo = {
    url: string;
    title: string;
    explanation: string;
    date: string;
};

const PictureOfTheDay = () => {
    const initialPictureInfo: pictureInfo = {
        url: '',
        title: '',
        explanation: '',
        date: ''
    }

    const [pictureInfo, setPictureInfo] = useState(initialPictureInfo);

    return (
        <div>
            <CssBaseline />
            <Container>
                <Box sx={{ bgcolor: '#73777B', height: '100vh', marginTop: '13vh' }}>
                    <DaySearcher setPictureInfo={setPictureInfo}/>
                    <hr />

                    <ImageRenderer pictureInfo={pictureInfo} />
                </Box>
            </Container>
        </div>
    );
};

export default PictureOfTheDay;
