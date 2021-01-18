import React from 'react';
import ReactDOM from 'react-dom';
import testTable from './testTable'
import { BrowserRouter ,Route } from "react-router-dom";

ReactDOM.render(

<BrowserRouter>
<Route exact path="/" component={testTable}/>
<testTable/>
</BrowserRouter>,

  document.getElementById('display')
);
