const jsdom = require("jsdom");

const { JSDOM } = jsdom;
require("iconv-lite").encodingExists("foo");
const tableSortJs = require("../public/table-sort");

function createTestTable(
  testTableData,
  thAttributes = { classTags: "" },
  invisibleIndex = []
) {
  const numberOfTableColumns = Object.keys(testTableData).length;
  let testTableHeaders = "";
  for (let i = 0; i < numberOfTableColumns; i++) {
    testTableHeaders += `<th class="${thAttributes.classTags}">Testing Column</th>`;
  }
  testTableHeaders = `<tr> ${testTableHeaders} </tr>`;

  function getRowsOfTd(index, type) {
    let rowsOfTd = "";
    for (let key in testTableData) {
      if (testTableData[key]) {
        if (type === "data-sort") {
          rowsOfTd += `<td data-sort="${index}">${testTableData[key][index]}</td>`;
        } else {
          rowsOfTd += `<td>${testTableData[key][index]}</td>`;
        }
      }
    }
    return rowsOfTd;
  }

  let testTableTdRows = [];
  for (let i = 0; i < testTableData["col1"].length; i++) {
    let testTableTdRow;
    if (thAttributes.classTags.includes("data-sort")) {
      testTableTdRow = `${getRowsOfTd(i, "data-sort")}`;
    } else {
      testTableTdRow = `${getRowsOfTd(i)}`;
    }
    if (invisibleIndex.includes(i)) {
      testTableTdRows.push(`<tr style="display: none;">${testTableTdRow}</tr>`);
    } else {
      testTableTdRows.push(`<tr> ${testTableTdRow}</tr>`);
    }
  }

  const dom = new JSDOM(`<!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <table class="table-sort">
      <thead>
      ${testTableHeaders}
      </thead>
    <tbody>
    ${testTableTdRows}
    </tbody>
  </table> 
  </body>
  </html>`);

  // Call tablesort and make table sortable and simulate clicks from a user.
  tableSortJs((testing = true), dom.window.document);

  for (let i = 0; i < numberOfTableColumns; i++) {
    dom.window.document.querySelectorAll("table th")[i].click();
  }

  // Make an array from table contents to test if sorted correctly.
  let table = dom.window.document.querySelector("table");
  const tableBody = table.querySelector("tbody");
  const tableRows = tableBody.querySelectorAll("tr");
  const testIfSortedList = {};

  for (let i = 0; i < numberOfTableColumns; i++) {
    testIfSortedList[`col${i + 1}`] = [];
  }

  for (let [i, tr] of tableRows.entries()) {
    if (tr.style.display !== "none") {
      for (let i = 0; i < numberOfTableColumns; i++)
        testIfSortedList[`col${i + 1}`].push(
          tr.querySelectorAll("td").item(i).innerHTML
        );
      // console.log(tr.querySelectorAll("td").item(i).innerHTML)
    }
  }
  return testIfSortedList;
}

module.exports = createTestTable;
