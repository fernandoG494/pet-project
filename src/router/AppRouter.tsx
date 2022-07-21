import { Routes, Route } from 'react-router-dom';
import AuthRoutes from '../auth/routes/AuthRoutes';
import GalaxiesRoutes from '../galaxies/routes/GalaxiesRoutes';

const AppRouter = () => {
    return (
        <div>
        <Routes>
            <Route path='/auth/*' element={<AuthRoutes />} />
            <Route path='*' element={<GalaxiesRoutes />} />
        </Routes>
        </div>
    );
};

export default AppRouter;