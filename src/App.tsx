import React from 'react';
import AppRouter from './router/AppRouter';
import Apptheme from './theme/AppTheme';

const App = () => {
    return (
        <Apptheme>
            <AppRouter />
        </Apptheme>
    );
};

export default App;