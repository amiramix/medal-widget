// Uncomment below two lines when starting the project with "npm start"
//import React from 'react';
//import ReactDOM from 'react-dom';
import './index.css';
import MedalWidget from './MedalWidget';
import * as serviceWorker from './serviceWorker';

// Uncomment below line when starting the project with "npm start"
//ReactDOM.render(<MedalWidget /*sort="gold"*/ />, document.getElementById('root'));

window.MedalWidget = MedalWidget;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
