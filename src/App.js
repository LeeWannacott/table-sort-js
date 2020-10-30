import React from 'react';
import logo from './logo.svg';
import './App.css';
import './html-tablesorter'

function App() {

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <table id="myTable" className="sortable">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email</th>
            <th>Due</th>
            <th>Web Site</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Smith</td>
            <td>John</td>
            <td>jsmith@gmail.com</td>
            <td>2</td>
            <td>http://www.jsmith.com</td>
          </tr>
          <tr>
            <td>Bach</td>
            <td>Frank</td>
            <td>fbach@yahoo.com</td>
            <td>5</td>
            <td>http://www.frank.com</td>
          </tr>
          <tr>
            <td>Doe</td>
            <td>Jason</td>
            <td>jdoe@hotmail.com</td>
            <td>3</td>
            <td>http://www.jdoe.com</td>
          </tr>
          <tr>
            <td>Conway</td>
            <td>Tim</td>
            <td>tconway@earthlink.net</td>
            <td>1</td>
            <td>http://www.timconway.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
