import css from './scss/app.scss';
import '../node_modules/spectre.css/dist/spectre.min.css';
//import './styles.css';
import React from 'react';
import ReactDom from 'react-dom';
import App from './components/app';

ReactDom.render(<App/>, document.getElementById('root'));