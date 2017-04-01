import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './routes/react';

window.onload = () => {
  ReactDOM.render(<AppRoutes/>, document.getElementById('main'));
};