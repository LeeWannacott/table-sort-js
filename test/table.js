const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require("iconv-lite").encodingExists("foo");
const tableSortJs = require("../public/table-sort");

function createTestTable(testTableData, classTags="") {

  let getClassTagsForTH = [];
  let testTableThRow = `<tr><th class="${classTags}">Testing Column</th></tr>`;
  getClassTagsForTH.push(testTableThRow);

  let testTableTdRows = [];
  for (let i = 0; i < testTableData.length; i++) {
    let testTableTdRow;
    if(classTags.includes("data-sort")){
      testTableTdRow = `<tr><td data-sort="${i}">${testTableData[i]}</td></tr>`;
    }else{
      testTableTdRow = `<tr><td>${testTableData[i]}</td></tr>`;
    }
    testTableTdRows.push(testTableTdRow);
  }

  const dom = new JSDOM(`<!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <table class="table-sort">
      <thead>
      ${getClassTagsForTH}
      </thead>
    <tbody>
    ${testTableTdRows}
    </tbody>
  </table> 
  </body>
  </html>`);

  // Call tablesort and make table sortable and simulate click from a user.
  tableSortJs(testing=true,dom.window.document);
  dom.window.document.querySelector("table th").click();

  // Make an array from table contents to test if sorted correctly.
  let table = dom.window.document.querySelector("table");
  const tableBody = table.querySelector("tbody");
  const tableRows = tableBody.querySelectorAll("tr");
  const testIfSortedList = [];
  for (let [i, tr] of tableRows.entries()) {
    testIfSortedList.push(tr.querySelectorAll("td").item(0).innerHTML);
  }
  return testIfSortedList;
}

module.exports = createTestTable;
