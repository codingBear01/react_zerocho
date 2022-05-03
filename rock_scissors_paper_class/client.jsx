import React from 'react';
import ReactDOM from 'react-dom/client';
import RockScissorsPaper from './RockScissorsPaper_class';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <RockScissorsPaper />
  </React.StrictMode>
);
