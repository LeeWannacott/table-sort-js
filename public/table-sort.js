/* 
table-sort-js
Author: Lee Wannacott
Licence: MIT License Copyright (c) 2021 Lee Wannacott 
    
GitHub Repository: https://github.com/LeeWannacott/table-sort-js
npm package: https://www.npmjs.com/package/table-sort-js
Demo: https://leewannacott.github.io/Portfolio/#/GitHub
Install:
Frontend: <script src="https://leewannacott.github.io/table-sort-js/table-sort.js"></script> or
Download this file and add <script src="table-sort.js"></script> to your HTML 
Backend: npm install table-sort-js and use require("../node_modules/table-sort-js/table-sort.js") 
Instructions:
  Add class="table-sort" to tables you'd like to make sortable
  Click on the table headers to sort them.
*/

function tableSortJs(doc = document) {
  const columnIndexAndTableRow = {};
  for (let table of doc.getElementsByTagName("table")) {
    if (table.classList.contains("table-sort")) {
      makeTableSortable(table);
    }
  }

  function makeTableSortable(sortableTable) {
    if (sortableTable.getElementsByTagName("thead").length === 0) {
      const the = doc.createElement("thead");
      the.appendChild(sortableTable.rows[0]);
      sortableTable.insertBefore(the, sortableTable.firstChild);
    }

    const tableHead = sortableTable.querySelector("thead");
    const tableBody = sortableTable.querySelector("tbody");
    const tableHeadHeaders = tableHead.querySelectorAll("th");

    tableHead.style.cursor = "pointer";

    let columnIndexesClicked= [];
    for (let [columnIndex, th] of tableHeadHeaders.entries()) {
      let timesClickedColumn = 0;

      th.addEventListener("click", function () {
        const tableRows = tableBody.querySelectorAll("tr");
        const columnData = [];

        // Handle filesize sorting (e.g KB, MB, GB, TB) - Turns data into KiB.
        let isFileSize = th.classList.contains('file-size')
        if(isFileSize) {
            const numberWithUnitType = /[.0-9]+(B|KB|KiB|MB|MiB|GB|GiB|TB|TiB)/i;
            const unitType = /(B|KB|KiB|MB|MiB|GB|GiB|TB|TiB)/i;
          for (let [i, tr] of tableRows.entries()) {
            let fileSizeTd = tr.querySelectorAll('td').item(columnIndex).textContent
            if (fileSizeTd.match(numberWithUnitType)){
              if(fileSizeTd.match(/KB/i)){
                fileSizeTd = fileSizeTd.replace(unitType,"");
                fileSizeTd = fileSizeTd / 1.024;
              } else if(fileSizeTd.match(/KiB/i)){
                fileSizeTd = fileSizeTd.replace(unitType,"");
              } else if(fileSizeTd.match(/MB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType,"");
                fileSizeTd = fileSizeTd * 977;
              } else if(fileSizeTd.match(/MiB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType,"");
                fileSizeTd = fileSizeTd * 1024;
              } else if(fileSizeTd.match(/GB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType,"");
                fileSizeTd =  fileSizeTd * 976563;
              } else if(fileSizeTd.match(/GiB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType,"");
                fileSizeTd =  fileSizeTd * 1.049e+6;
              } else if(fileSizeTd.match(/TB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType,"");
                fileSizeTd =  fileSizeTd * 9.766e+8;
              } else if(fileSizeTd.match(/TiB/i)) {
                fileSizeTd = fileSizeTd.replace(unitType,"");
                fileSizeTd =  fileSizeTd * 1.074e+9;
              } else if(fileSizeTd.match(/B/i)) {
                fileSizeTd = fileSizeTd.replace(unitType,"");
                fileSizeTd =  fileSizeTd / 1024
              }
              tr.querySelectorAll('td').item(columnIndex).textContent = fileSizeTd;
            };
          }
        }


        // Checking if user has clicked different column from the first column if yes reset times clicked.
        columnIndexesClicked.push(columnIndex);
        if(timesClickedColumn === 1 && columnIndexesClicked.length > 1) {
          const lastColumnClicked = columnIndexesClicked[columnIndexesClicked.length -1];
          const secondLastColumnClicked = columnIndexesClicked[columnIndexesClicked.length -2];
          if(lastColumnClicked !== secondLastColumnClicked) {
            timesClickedColumn = 0;
            columnIndexesClicked.shift()
          }
        }

        timesClickedColumn += 1;
        getTableData();
        updateTable();

        function updateTable() {
          for (let [i, tr] of tableRows.entries()) {
            tr.innerHTML = columnIndexAndTableRow[columnData[i]];
            // Add unit types for file-size e.g (KiB,MiB,GiB,TiB).
            if(isFileSize){
            let fileSizeKibibytes = tr.querySelectorAll('td').item(columnIndex).textContent;
                if(fileSizeKibibytes < 1024){
                    fileSizeKibibytes = parseFloat((fileSizeKibibytes)).toFixed(2) + "KiB";
                  } else if(fileSizeKibibytes >= 1024 && fileSizeKibibytes < 1.049e+6){
                    fileSizeKibibytes = (fileSizeKibibytes / 1024).toFixed(2) + "MiB";
                  } else if(fileSizeKibibytes >= 1.049e+6 && fileSizeKibibytes < 1.074e+9){
                    fileSizeKibibytes = (fileSizeKibibytes / 1.049e+6).toFixed(2) + "GiB";
                  } else if(fileSizeKibibytes >= 1.074e+9 < 1.1e+12){
                    fileSizeKibibytes = (fileSizeKibibytes /1.074e+9).toFixed(2) + "TiB";
                  }
                  tr.querySelectorAll('td').item(columnIndex).textContent = fileSizeKibibytes;
              }
            }
          }

        function getTableData() {
          for (let [i, tr] of tableRows.entries()) {
            // inner text for column we click on
            let tdTextContent = tr.querySelectorAll('td').item(columnIndex).textContent;
            if(tdTextContent.length === 0){
              tdTextContent = ""
            }
            if (tdTextContent.trim() !== "") {
              columnData.push(tdTextContent + '#' + i);
              columnIndexAndTableRow[tdTextContent + '#' + i] = tr.innerHTML;
            } else {
              // Fill in blank table cells dict key with filler value.
              columnData.push("!X!Y!Z!#" + i);
              columnIndexAndTableRow["!X!Y!Z!#" + i] = tr.innerHTML;
            }
          
          }

          function naturalSortAescending(a, b) {
            if (a.includes("X!Y!Z!#")) {
              return 1;
            } else if (b.includes("X!Y!Z!#")) {
              return -1;
            } else {
              return a.localeCompare(
                b,
                navigator.languages[0] || navigator.language,
                { numeric: true, ignorePunctuation: true }
              );
            }
          }

          function naturalSortDescending(a, b) {
            return naturalSortAescending(b, a);
          }

          function clearArrows(arrowUp = "▲", arrowDown = "▼") {
            th.innerText = th.innerText.replace(arrowUp, "");
            th.innerText = th.innerText.replace(arrowDown, "");
          }

          let arrowUp = " ▲";
          let arrowDown = " ▼";

          // Sort naturally; default aescending unless th contains 'order-by-desc' as className.
          if (columnData[0] === undefined) {
            return;
          }

          let desc = th.classList.contains('order-by-desc');
          let tableArrows = sortableTable.classList.contains('table-arrows');

          if (timesClickedColumn === 1) {
            if (desc) {
              if (tableArrows) {
                clearArrows(arrowUp, arrowDown);
                th.insertAdjacentText("beforeend", arrowDown);
              }
              columnData.sort(naturalSortDescending, {
                numeric: true,
                ignorePunctuation: true,
              });
            } else {
              if (tableArrows) {
                clearArrows(arrowUp, arrowDown);
                th.insertAdjacentText("beforeend", arrowUp);
              }
              columnData.sort(naturalSortAescending);
            }
          } else if (timesClickedColumn === 2) {
            timesClickedColumn = 0;
            if (desc) {
              if (tableArrows) {
                clearArrows(arrowUp, arrowDown);
                th.insertAdjacentText("beforeend", arrowUp);
              }
              columnData.sort(naturalSortAescending, {
                numeric: true,
                ignorePunctuation: true,
              });
            } else {
              if (tableArrows) {
                clearArrows(arrowUp, arrowDown);
                th.insertAdjacentText("beforeend", arrowDown);
              }
              columnData.sort(naturalSortDescending);
            }
          }
        }
      });
    }
  }
}

if (
  document.readyState === "complete" ||
  document.readyState === "interactive"
) {
  tableSortJs();
} else if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", tableSortJs, false);
}
if (typeof module == 'object') {
  module.exports = tableSortJs;
}