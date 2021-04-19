const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require('iconv-lite').encodingExists('foo')
tableSortJs = require('../public/table-sort')

function createTestTable(testTableData){
  let classes = "";
  if(testTableData.includes('file-size')){
    classes = "file-size"
  }

  const dom = new JSDOM(`<!DOCTYPE html>
  <html>
  <head>
  </head>
  <body>
  <table class="table-sort">
  <thead>
    <tr>
      <th class="${classes}">Testing Column</th>
    </tr>
    </thead>
    <tbody>
    <tr>
      <td>${testTableData[0]}</td>
    </tr>
    <tr>
      <td>${testTableData[1]}</td>
    </tr>
    <tr>
      <td>${testTableData[2]}</td>
    </tr>
    <tr>
      <td>${testTableData[3]}</td>
    </tr>
    <tr>
      <td>${testTableData[4]}</td>
    </tr>
    </tbody>
  </table> 
  </body>
  </html>`);
  // The script will be executed and modify the DOM:
  dom.window.document.body.children.length === 2;

  // Call tablesort and make table sortable and simulate click from a user.
  tableSortJs(dom.window.document)
  dom.window.document.querySelector("table th").click()

  // Make an array from table contents to test if sorted correctly.
  let table = dom.window.document.querySelector("table")
  const tableBody = table.querySelector("tbody");
  const tableRows = tableBody.querySelectorAll("tr");
  testIfSortedList = []
  for (let [i, tr] of tableRows.entries()) {
    testIfSortedList.push(tr.querySelectorAll('td').item(0).innerHTML)
    }
    return testIfSortedList
}
module.exports = createTestTable;