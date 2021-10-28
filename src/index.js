import React from 'react';
import ReactDOM from 'react-dom';
import TestTable from './test-table'
import { BrowserRouter ,Route } from "react-router-dom";

ReactDOM.render(

<BrowserRouter>
<Route exact path="/" component={TestTable}/>
<TestTable/>
</BrowserRouter>,

  document.getElementById('display')
);
