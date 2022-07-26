import React, {
    useEffect,
} from 'react';
import Apptheme from './theme/AppTheme';
import AppRouter from './router/AppRouter';
import { useAppSelector } from './hooks/hooks';

const App = () => {

    useEffect(() => {
        console.log('change on user state');
    }, [useAppSelector((state) => state.auth.isLogged)])

    return (
        <Apptheme>
            <AppRouter />
        </Apptheme>
    );
};

export default App;