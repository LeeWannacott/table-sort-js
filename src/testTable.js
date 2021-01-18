import React, { Component } from 'react';

function App() {

React.useEffect(() => {
  const script = document.createElement("script");
  script.src = "http://localhost:3000/table-sort-js/table-sort.js";
  script.async = true;
  document.body.appendChild(script); 
  }, []);
  

  return (
    <div className="App">
      <header className="App-header">
      </header>
      <h1>Testing Tables</h1>
      <table className="table-sort">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email</th>
            <th className='order-by-desc'>Due</th>
            <th>Web Site</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Smith</td>
            <td>John</td>
            <td>jsmith@gmail.com</td>
            <td>2234</td>
            <td>http://www.jsmith.com</td>
          </tr>
          <tr>
            <td>Bach</td>
            <td>Frank</td>
            <td>fbach@yahoo.com</td>
            <td>1.6</td>
            <td>http://www.frank.com</td>
          </tr>
          <tr>
            <td>Doe</td>
            <td>Jason</td>
            <td>jdoe@hotmail.com</td>
            <td>1,234,567,8,89</td>
            <td>http://www.jdoe.com</td>
          </tr>
          <tr>
            <td>Conway</td>
            <td>Tim</td>
            <td>tconway@earthlink.net</td>
            <td>1.234.567.8,90</td>
            <td>http://www.timconway.com</td>
          </tr>
          <tr>
            <td>Conway</td>
            <td>T</td>
            <td>t.net</td>
            <td>1,234,567,8,91</td>
            <td>http://www.ti.com</td>
          </tr>
        </tbody>
      </table>

      

      <table id="myTable" className="table-sort">
        <thead>
          <tr>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Email</th>
            <th className ='order-by-desc'>Due</th>
            <th>Web Site</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>2</td>
            <td>John</td>
            <td>jsmith@gmail.com</td>
            <td>2020-11-28</td>
            <td>http://www.jsmith.com</td>
          </tr>
          <tr>
            <td>Bach</td>
            <td></td>
            <td>fbach@yahoo.com</td>
            <td></td>
            <td>http://www.frank.com</td>
          </tr>
          <tr>
            <td>Doe</td>
            <td>Jason</td>
            <td>jdoe@hotmail.com</td>
            <td>2020-11-25</td>
            <td>http://www.jdoe.com</td>
          </tr>
          <tr>
            <td>t</td>
            <td>Tim</td>
            <td>tconway@earthlink.net</td>
            <td>1</td>
            <td>http://www.timconway.com</td>
          </tr>
          <tr>
            <td>Conway</td>
            <td>T</td>
            <td>t.net</td>
            <td>2020-11-13</td>
            <td>http://www.ti.com</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default App;
