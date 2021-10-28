const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require("iconv-lite").encodingExists("foo");
const tableSortJs = require("../public/table-sort");

function createTestTableNoMissingTags(testTableData, classTags = "") {
  let getClassTagsForTH = [];
  let testTableThRow = `<tr><th class="${classTags}">Testing Column</th></tr>`;
  getClassTagsForTH.push(testTableThRow);

  let testTableTdRows = [];
  for (let i = 0; i < testTableData.length; i++) {
    let testTableTdRow = `<tr><td>${testTableData[i]}</td></tr>`;
    testTableTdRows.push(testTableTdRow);
  }

  const tableWithHeadAndBody = new JSDOM(`<!DOCTYPE html>
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
  tableSortJs((test = true), tableWithHeadAndBody.window.document);
  tableWithHeadAndBody.window.document.querySelector("table th").click();
  // Make an array from table contents to test if sorted correctly.
  let table = tableWithHeadAndBody.window.document.querySelector("table");
  const tableBody = table.querySelector("tbody");
  const tableRows = [...tableBody.querySelectorAll("tr")];
  const testIfSortedList = tableRows.map(tr => tr.querySelectorAll("td").item(0).innerHTML);
  return testIfSortedList;
}

function createTestTableMissingHeadTag(testTableData, classTags = "") {
  let getClassTagsForTH = [];
  let testTableThRow = `<tr><th class="${classTags}">Testing Column</th></tr>`;
  getClassTagsForTH.push(testTableThRow);

  let testTableTdRows = [];
  for (let i = 0; i < testTableData.length; i++) {
    let testTableTdRow = `<tr><td>${testTableData[i]}</td></tr>`;
    testTableTdRows.push(testTableTdRow);
  }

  const tableWithMissingHeadTag = new JSDOM(`<!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <table class="table-sort">
    <tbody>
    ${getClassTagsForTH}
    ${testTableTdRows}
    </tbody>
  </table> 
  </body>
  </html>`);

  // Call tablesort and make table sortable and simulate click from a user.
  tableSortJs((test = true), tableWithMissingHeadTag.window.document);
  tableWithMissingHeadTag.window.document.querySelector("table th").click();
  // Make an array from table contents to test if sorted correctly.
  let table = tableWithMissingHeadTag.window.document.querySelector("table");
  const tableBody = table.querySelector("tbody");
  const tableRows = [...tableBody.querySelectorAll("tr")];
  const testIfSortedList = tableRows.map(tr => tr.querySelectorAll("td").item(0).innerHTML);
  return testIfSortedList;
}

function createTestTableMissingBodyTag(testTableData, classTags = "") {
  let getClassTagsForTH = [];
  let testTableThRow = `<tr><th class="${classTags}">Testing Column</th></tr>`;
  getClassTagsForTH.push(testTableThRow);

  let testTableTdRows = [];
  for (let i = 0; i < testTableData.length; i++) {
    let testTableTdRow = `<tr><td>${testTableData[i]}</td></tr>`;
    testTableTdRows.push(testTableTdRow);
  }

  const tablewithMissingBodyTag = new JSDOM(`<!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <table class="table-sort">
      <thead>
        ${getClassTagsForTH}
      </thead>
    ${testTableTdRows}
  </table> 
  </body>
  </html>`);

  // Call tablesort and make table sortable and simulate click from a user.
  tableSortJs((test = true), tablewithMissingBodyTag.window.document);
  tablewithMissingBodyTag.window.document.querySelector("table th").click();
  // Make an array from table contents to test if sorted correctly.
  let table = tablewithMissingBodyTag.window.document.querySelector("table");
  const tableBody = table.querySelector("tbody");
  const tableRows = [...tableBody.querySelectorAll("tr")];
  const testIfSortedList = tableRows.map(tr => tr.querySelectorAll("td").item(0).innerHTML);
  return testIfSortedList;
}

function createTestTableMissingBodyAndHeadTag(testTableData, classTags = "") {
  let getClassTagsForTH = [];
  let testTableThRow = `<tr><th class="${classTags}">Testing Column</th></tr>`;
  getClassTagsForTH.push(testTableThRow);

  let testTableTdRows = [];
  for (let i = 0; i < testTableData.length; i++) {
    let testTableTdRow = `<tr><td>${testTableData[i]}</td></tr>`;
    testTableTdRows.push(testTableTdRow);
  }

  const tableWithMissingBodyAndHeadTag = new JSDOM(`<!DOCTYPE html>
  <html>
    <head>
    </head>
    <body>
      <table class="table-sort">
    ${getClassTagsForTH}
    ${testTableTdRows}
  </table> 
  </body>
  </html>`);

  // Call tablesort and make table sortable and simulate click from a user.
  tableSortJs((test = true), tableWithMissingBodyAndHeadTag.window.document);
  tableWithMissingBodyAndHeadTag.window.document
    .querySelector("table th")
    .click();
  // Make an array from table contents to test if sorted correctly.
  let table =
    tableWithMissingBodyAndHeadTag.window.document.querySelector("table");
  const tableBody = table.querySelector("tbody");
  const tableRows = [...tableBody.querySelectorAll("tr")];
  const testIfSortedList = tableRows.map(tr => tr.querySelectorAll("td").item(0).innerHTML);
  return testIfSortedList;
}

module.exports = {
  createTestTableNoMissingTags,
  createTestTableMissingHeadTag,
  createTestTableMissingBodyTag,
  createTestTableMissingBodyAndHeadTag,
};
