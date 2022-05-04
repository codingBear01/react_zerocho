import React from 'react';
import ReactDOM from 'react-dom/client';
import Minesweeper from './Minesweeper';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Minesweeper />
  </React.StrictMode>
);
