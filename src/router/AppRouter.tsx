import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import AuthRoutes from '../auth/routes/AuthRoutes';
import GalaxiesRoutes from '../galaxies/routes/GalaxiesRoutes';
import GalleryRoutes from '../galaxies/routes/GalleryRoutes';

const AppRouter = () => {
    const [isUser, setIsUser] = useState(false);

    useEffect(() => {
        const isUser = localStorage.getItem('token');
        if(isUser){
            setIsUser(true);
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