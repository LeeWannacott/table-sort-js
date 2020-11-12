import React from 'react';
import ReactDOM from 'react-dom';
// import App from './table-sort-test';
import TestTable from './TestTable'
import { HashRouter, BrowserRouter ,Route } from "react-router-dom";

ReactDOM.render(

<BrowserRouter>
<Route exact path="/" component={TestTable}/>
<TestTable/>

</BrowserRouter>,
  document.getElementById('display')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
