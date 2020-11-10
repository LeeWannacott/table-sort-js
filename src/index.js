import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './table-sort';
import * as serviceWorker from './serviceWorker';
import TestTable from './TestTable'
import DisplayTableSort from './TableSortScript';
import { HashRouter, BrowserRouter ,Route } from "react-router-dom";

ReactDOM.render(

<BrowserRouter>
<Route exact path="/.js" component={DisplayTableSort}/>
<DisplayTableSort/>
</BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
