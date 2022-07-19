import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoutes from '../auth/routes/AuthRoutes';
import GalaxiesRoutes from '../galaxies/routes/GalaxiesRoutes';

const AppRouter = () => {
    return (
        <Routes>
            <Route path='/auth/*' element={<AuthRoutes />} />
            
            <Route path='/*' element={<GalaxiesRoutes />}/>
        </Routes>
    );
};

export default AppRouter;