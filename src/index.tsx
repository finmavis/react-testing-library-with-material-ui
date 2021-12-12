import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

if (process.env.NODE_ENV === 'development') {
  import('./mocks/browser')
    .then(({ worker }) => {
      worker.start();
    })
    .catch((error) => {
      console.error('Failed to import msw mocks browser', error);
    });
}

const root = document.getElementById('root');
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

render(app, root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
