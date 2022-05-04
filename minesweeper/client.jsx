import React from 'react';
import ReactDOM from 'react-dom/client';
import TicTacToe from './TicTacToe';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <TicTacToe />
  </React.StrictMode>
);
