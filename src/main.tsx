import App from './App';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { store } from './store/store.js';
import { BrowserRouter } from 'react-router-dom';

import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);
