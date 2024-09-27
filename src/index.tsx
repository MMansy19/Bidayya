import 'primereact/resources/themes/saga-blue/theme.css'; // Theme
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons
import 'primeflex/primeflex.css'; // Flex utilities (optional)

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { PrimeReactProvider } from 'primereact/api';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
    <PrimeReactProvider>
      <Provider store={store}>
        <GoogleOAuthProvider
          clientId={process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || ''}
        >
          {/* <BrowserRouter> */}
            <App />
          {/* </BrowserRouter> */}
        </GoogleOAuthProvider>
      </Provider>
    </PrimeReactProvider>
  // {/* </React.StrictMode> */}
);
