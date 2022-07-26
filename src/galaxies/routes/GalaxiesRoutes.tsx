import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';
import Mars from '../components/Mars/Mars';
import NavBar from '../components/NavBar/NavBar';
import GalaxiesPage from '../pages/GalaxiesPage';

const GalaxiesRoutes = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='*' element={<GalaxiesPage />} />
                <Route path='/mars' element={<Mars />} />
                <Route path='/dashboard/*' element={<GalaxiesRoutes />} />
            </Routes>
        </div>
    );
};

export default GalaxiesRoutes;