import React from 'react';
import ReactDOM from 'react-dom/client';
import Test from './RenderTest';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <Test />
  </React.StrictMode>
);
