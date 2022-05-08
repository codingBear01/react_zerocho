import React from 'react';
import ReactDOM from 'react-dom/client';
import Games from './Games';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Games />
  </React.StrictMode>
);
