import React from 'react';
import ReactDOM from 'react-dom/client';
import NumberBaseball from './NumberBaseball_hooks';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <NumberBaseball />
  </React.StrictMode>
);
