import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';
import GalaxiesPage from '../pages/GalaxiesPage';

const GalaxiesRoutes = () => {
    return (
        <Routes>
            <Route path='/' element={<GalaxiesPage />} />

            <Route path='/*' element={<Navigate to='/' />} />
        </Routes>
    );
};

export default GalaxiesRoutes;