import React from 'react';
import ReactDOM from 'react-dom/client';
import Lotto from './Lotto_hooks';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Lotto />
  </React.StrictMode>
);
