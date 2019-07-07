import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import View1 from './Components/View1'
import Admin from './Components/Admin'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Admin/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


//View1 src="1294ecba1487e2ac00130ecb5182c05c1cab44ad126a9b463a2f377b39d37dab"/>,