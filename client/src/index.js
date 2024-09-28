// client/src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client'; // Import createRoot from 'react-dom/client'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store/store';

// Get the root element from the HTML
const rootElement = document.getElementById('root');

// Create a root
const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
