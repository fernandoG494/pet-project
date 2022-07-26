import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoutes from '../auth/routes/AuthRoutes';
import GalaxiesRoutes from '../galaxies/routes/GalaxiesRoutes';
import GalleryRoutes from '../galaxies/routes/GalleryRoutes';

const AppRouter = () => {
    const [isUser, setIsUser] = useState([]);

    useEffect(() => {
        const isUser = localStorage.getItem('data');
        if(isUser){
            setIsUser(JSON.parse(isUser));
        }
    }, []);

    return (
        <div>
        <Routes>
            <Route path='*' element={<GalaxiesRoutes />} />
            <Route path='/auth/*' element={<AuthRoutes />} />
            <Route path='/gallery/*' element={<GalleryRoutes />} />
        </Routes>
        </div>
    );
};

export default AppRouter;