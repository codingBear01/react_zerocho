import React from 'react';
import ReactDOM from 'react-dom/client';
import ResponseCheck from './ResponseCheck_hooks';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <ResponseCheck />
  </React.StrictMode>
);
