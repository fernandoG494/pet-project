import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoutes from '../auth/routes/AuthRoutes';
import Earth from '../components/Earth/Earth';
import Exoplanets from '../components/Exoplanets/Exoplanets';
import Mars from '../components/Mars/Mars';
import NavBar from '../components/NavBar/NavBar';
import GalaxiesRoutes from '../galaxies/routes/GalaxiesRoutes';

const AppRouter = () => {
    return (
        <div>

        <NavBar />
        <Routes>
            <Route path='/auth/*' element={<AuthRoutes />} />

            <Route path='/' element={<GalaxiesRoutes />}/>
            <Route path='/dashboard' element={<GalaxiesRoutes />} />
            <Route path='/exoplanets' element={<Exoplanets />} />
            <Route path='/mars' element={<Mars />} />
            <Route path='/earth' element={<Earth />} />
        </Routes>
        </div>
    );
};

export default AppRouter;