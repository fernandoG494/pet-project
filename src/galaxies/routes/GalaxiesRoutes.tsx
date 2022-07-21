import React from 'react'
import {Route, Routes, Navigate} from 'react-router-dom';
import Asteroids from '../../components/Asteroids/Asteroids';
import Earth from '../../components/Earth/Earth';
import Mars from '../../components/Mars/Mars';
import NavBar from '../../components/NavBar/NavBar';
import GalaxiesPage from '../pages/GalaxiesPage';

const GalaxiesRoutes = () => {
    return (
        <div>
            <NavBar />
            <Routes>
                <Route path='/' element={<GalaxiesPage />} />
                <Route path='/dashboard' element={<GalaxiesRoutes />} />
                <Route path='/mars' element={<Mars />} />
                <Route path='/earth' element={<Earth />} />
                <Route path='/*' element={<GalaxiesPage />} />
            </Routes>
        </div>
    );
};

export default GalaxiesRoutes;