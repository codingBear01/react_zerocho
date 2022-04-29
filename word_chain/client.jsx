/* Pre-React 18
const ReactDom = require('react-dom');

ReactDom.render(<WordChain />, document.querySelector('#root'));*/

// React 18
import React from 'react';
import ReactDOM from 'react-dom/client';
import WordChain from './WordChain';

const container = document.querySelector('#root');
const root = ReactDOM.createRoot(container);

root.render(<WordChain />);
