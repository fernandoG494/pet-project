import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom';
import Gallery from '../components/Gallery/Gallery';
import NavBar from '../components/NavBar/NavBar';

const GalleryRoutes = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={<Gallery />} />
                <Route path='/*' element={<Gallery />} />
            </Routes>
        </div>
    );
};

export default GalleryRoutes;