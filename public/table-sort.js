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

function tableSortJs(testingTableSortJS = false, domDocumentWindow = document) {
  function getHTMLTables() {
    if (testingTableSortJS === true) {
      const getTagTable = domDocumentWindow.getElementsByTagName("table");
      return [getTagTable];
    } else {
      const getTagTable = document.getElementsByTagName("table");
      return [getTagTable];
    }
  }

  const [getTagTable] = getHTMLTables();
  const columnIndexAndTableRow = {};
  const fileSizeColumnTextAndRow = {};
  for (let table of getTagTable) {
    if (table.classList.contains("table-sort")) {
      makeTableSortable(table);
    }
  }

  function makeTableSortable(sortableTable) {
    let createTableHead;
    let tableBody;
    if (sortableTable.getElementsByTagName("thead").length === 0) {
      if (testingTableSortJS === true) {
        createTableHead = domDocumentWindow.createElement("thead");
      } else {
        createTableHead = document.createElement("thead");
      }
      createTableHead.appendChild(sortableTable.rows[0]);
      sortableTable.insertBefore(createTableHead, sortableTable.firstChild);
      if (sortableTable.querySelectorAll("tbody").length > 1) {
        tableBody = sortableTable.querySelectorAll("tbody")[1];
      } else {
        tableBody = sortableTable.querySelector("tbody");
      }
    } else {
      tableBody = sortableTable.querySelector("tbody");
    }

    const tableHead = sortableTable.querySelector("thead");
    const tableHeadHeaders = tableHead.querySelectorAll("th");

    for (let [columnIndex, th] of tableHeadHeaders.entries()) {
      if (!th.classList.contains("disable-sort")) {
        th.style.cursor = "pointer";
        makeEachColumnSortable(th, columnIndex, tableBody, sortableTable);
      }
    }
  }

  function makeEachColumnSortable(th, columnIndex, tableBody, sortableTable) {
    const desc = th.classList.contains("order-by-desc");
    let tableArrows = sortableTable.classList.contains("table-arrows");
    const [arrowUp, arrowDown] = [" ▲", " ▼"];
    const fillValue = "!X!Y!Z!";

    if (desc && tableArrows) {
      th.insertAdjacentText("beforeend", arrowDown);
    } else if (tableArrows) {
      th.insertAdjacentText("beforeend", arrowUp);
    }

    function sortDataAttributes(tableRows, columnData) {
      for (let [i, tr] of tableRows.entries()) {
        const dataAttributeTd = tr.querySelectorAll("td").item(columnIndex)
          .dataset.sort;
        columnData.push(`${dataAttributeTd}#${i}`);
        columnIndexAndTableRow[columnData[i]] = tr.innerHTML;
      }
    }

    function sortFileSize(tableRows, columnData) {
      const numberWithUnitType =
        /[.0-9]+(\s?B|\s?KB|\s?KiB|\s?MB|\s?MiB|\s?GB|\s?GiB|T\s?B|\s?TiB)/i;
      const unitType =
        /(\s?B|\s?KB|\s?KiB|\s?MB|\s?MiB|\s?GB|G\s?iB|\s?TB|\s?TiB)/i;
      const fileSizes = {
        Kibibyte: 1024,
        Mebibyte: 1.049e6,
        Gibibyte: 1.074e9,
        Tebibyte: 1.1e12,
        Pebibyte: 1.126e15,
        Kilobyte: 1000,
        Megabyte: 1e6,
        Gigabyte: 1e9,
        Terabyte: 1e12,
      };
      function removeUnitTypeConvertToBytes(fileSizeTd, _replace, i) {
        fileSizeTd = fileSizeTd.replace(unitType, "");
        fileSizeTd = fileSizeTd.replace(
          fileSizeTd,
          fileSizeTd * fileSizes[_replace]
        );
        if (i) {
          columnData.push(`${fileSizeTd}#${i}`);
        }
        return fileSizeTd;
      }
      for (let [i, tr] of tableRows.entries()) {
        let fileSizeTd = tr
          .querySelectorAll("td")
          .item(columnIndex).textContent;
        if (fileSizeTd.match(numberWithUnitType)) {
          if (fileSizeTd.match(/\s?KB/i)) {
            removeUnitTypeConvertToBytes(fileSizeTd, "Kilobyte", i);
          } else if (fileSizeTd.match(/\s?KiB/i)) {
            removeUnitTypeConvertToBytes(fileSizeTd, "Kibibyte", i);
          } else if (fileSizeTd.match(/\s?MB/i)) {
            // TODO: figure out why refactoring this line breaks test.
            fileSizeTd = removeUnitTypeConvertToBytes(fileSizeTd, "Megabyte");
            columnData.push(`${fileSizeTd}#${i}`);
          } else if (fileSizeTd.match(/\s?MiB/i)) {
            removeUnitTypeConvertToBytes(fileSizeTd, "Mebibyte", i);
          } else if (fileSizeTd.match(/\s?GB/i)) {
            removeUnitTypeConvertToBytes(fileSizeTd, "Gigabyte", i);
          } else if (fileSizeTd.match(/\s?GiB/i)) {
            removeUnitTypeConvertToBytes(fileSizeTd, "Gibibyte", i);
          } else if (fileSizeTd.match(/\s?TB/i)) {
            removeUnitTypeConvertToBytes(fileSizeTd, "Terabyte", i);
          } else if (fileSizeTd.match(/\s?TiB/i)) {
            removeUnitTypeConvertToBytes(fileSizeTd, "Tebibyte", i);
          } else if (fileSizeTd.match(/\s?B/i)) {
            fileSizeTd = fileSizeTd.replace(unitType, "");
            columnData.push(`${fileSizeTd}#${i}`);
          }
        } else {
          columnData.push(`${fillValue}#${i}`);
        }
      }
    }

    let [timesClickedColumn, columnIndexesClicked] = [0, []];

    function rememberSort(timesClickedColumn, columnIndexesClicked) {
      // if user clicked different column from first column reset times clicked.
      columnIndexesClicked.push(columnIndex);
      if (timesClickedColumn === 1 && columnIndexesClicked.length > 1) {
        const lastColumnClicked =
          columnIndexesClicked[columnIndexesClicked.length - 1];
        const secondLastColumnClicked =
          columnIndexesClicked[columnIndexesClicked.length - 2];
        if (lastColumnClicked !== secondLastColumnClicked) {
          timesClickedColumn = 0;
          columnIndexesClicked.shift();
        }
      }
    }

    function getColSpanData(sortableTable, colSpanData, colSpanSum) {
      sortableTable.querySelectorAll("th").forEach((th, index) => {
        colSpanData[index] = th.colSpan;
        if (index === 0) colSpanSum[index] = th.colSpan;
        else colSpanSum[index] = colSpanSum[index - 1] + th.colSpan;
      });
    }

    function getTableData(tableProperties) {
      const {
        tableRows,
        columnData,
        isFileSize,
        isDataAttribute,
        colSpanData,
        colSpanSum,
      } = tableProperties;
      for (let [i, tr] of tableRows.entries()) {
        let tdTextContent = tr
          .querySelectorAll("td")
          .item(
            colSpanData[columnIndex] === 1
              ? colSpanSum[columnIndex] - 1
              : colSpanSum[columnIndex] - colSpanData[columnIndex]
          ).textContent;
        if (tdTextContent.length === 0) {
          tdTextContent = "";
        }
        if (tdTextContent.trim() !== "") {
          if (isFileSize) {
            fileSizeColumnTextAndRow[columnData[i]] = tr.innerHTML;
          }
          if (!isFileSize && !isDataAttribute) {
            columnData.push(`${tdTextContent}#${i}`);
            columnIndexAndTableRow[`${tdTextContent}#${i}`] = tr.innerHTML;
          }
        } else {
          // Fill in blank table cells dict key with filler value.
          columnData.push(`${fillValue}#${i}`);
          columnIndexAndTableRow[`${fillValue}#${i}`] = tr.innerHTML;
        }
      }

      const isPunctSort = th.classList.contains("punct-sort");
      const isAlphaSort = th.classList.contains("alpha-sort");
      function sortAscending(a, b) {
        if (a.includes(`${fillValue}#`)) {
          return 1;
        } else if (b.includes(`${fillValue}#`)) {
          return -1;
        } else {
          return a.localeCompare(
            b,
            navigator.languages[0] || navigator.language,
            { numeric: !isAlphaSort, ignorePunctuation: !isPunctSort }
          );
        }
      }

      function sortDescending(a, b) {
        return sortAscending(b, a);
      }

      function clearArrows(arrowUp = "▲", arrowDown = "▼") {
        th.innerHTML = th.innerHTML.replace(arrowUp, "");
        th.innerHTML = th.innerHTML.replace(arrowDown, "");
      }

      if (columnData[0] === undefined) {
        return;
      }

      function changeTableArrow(arrowDirection) {
        if (tableArrows) {
          clearArrows(arrowUp, arrowDown);
          th.insertAdjacentText("beforeend", arrowDirection);
        }
      }

      function sortColumn(sortDirection) {
        columnData.sort(sortDirection, {
          numeric: !isAlphaSort,
          ignorePunctuation: !isPunctSort,
        });
      }

      if (timesClickedColumn === 1) {
        if (desc) {
          changeTableArrow(arrowDown);
          sortColumn(sortDescending);
        } else {
          changeTableArrow(arrowUp);
          sortColumn(sortAscending);
        }
      } else if (timesClickedColumn === 2) {
        timesClickedColumn = 0;
        if (desc) {
          changeTableArrow(arrowUp);
          sortColumn(sortAscending);
        } else {
          changeTableArrow(arrowDown);
          sortColumn(sortDescending);
        }
      }
    }

    function updateTable(tableProperties) {
      const { tableRows, columnData, isFileSize } = tableProperties;
      for (let [i, tr] of tableRows.entries()) {
        if (isFileSize) {
          tr.innerHTML = fileSizeColumnTextAndRow[columnData[i]];
          let fileSizeInBytesHTML = tr
            .querySelectorAll("td")
            .item(columnIndex).innerHTML;
          const fileSizeInBytesText = tr
            .querySelectorAll("td")
            .item(columnIndex).textContent;
          const fileSizes = {
            Kibibyte: 1024,
            Mebibyte: 1.049e6,
            Gibibyte: 1.074e9,
            Tebibyte: 1.1e12,
            Pebibyte: 1.126e15,
          };
          // Remove the unique identifyer for duplicate values(#number).
          columnData[i] = columnData[i].replace(/#[0-9]*/, "");
          const fileSize = columnData[i];
          if (fileSize < fileSizes.Kibibyte) {
            fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
              fileSizeInBytesText,
              `${parseFloat(fileSize).toFixed(2)} B`
            );
          } else if (
            fileSize >= fileSizes.Kibibyte &&
            fileSize < fileSizes.Mebibyte
          ) {
            fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
              fileSizeInBytesText,
              `${(fileSize / fileSizes.Kibibyte).toFixed(2)} KiB`
            );
          } else if (
            fileSize >= fileSizes.Mebibyte &&
            fileSize < fileSizes.Gibibyte
          ) {
            fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
              fileSizeInBytesText,
              `${(fileSize / fileSizes.Mebibyte).toFixed(2)} MiB`
            );
          } else if (
            fileSize >= fileSizes.Gibibyte &&
            fileSize < fileSizes.Tebibyte
          ) {
            fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
              fileSizeInBytesText,
              `${(fileSize / fileSizes.Gibibyte).toFixed(2)} GiB`
            );
          } else if (
            fileSize >= fileSizes.Tebibyte &&
            fileSize < fileSizes.Pebibyte
          ) {
            fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
              fileSizeInBytesText,
              `${(fileSize / fileSizes.Tebibyte).toFixed(2)} TiB`
            );
          } else {
            fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
              fileSizeInBytesText,
              "NaN"
            );
          }
          tr.querySelectorAll("td").item(columnIndex).innerHTML =
            fileSizeInBytesHTML;
        } else if (!isFileSize) {
          tr.innerHTML = columnIndexAndTableRow[columnData[i]];
        }
      }
    }

    th.addEventListener("click", function () {
      const [columnData, colSpanData, colSpanSum] = [[], {}, {}];

      const visibleTableRows = Array.prototype.filter.call(
        tableBody.querySelectorAll("tr"),
        (tr) => {
          return tr.style.display !== "none";
        }
      );

      const isDataAttribute = th.classList.contains("data-sort");
      if (isDataAttribute) {
        sortDataAttributes(visibleTableRows, columnData);
      }

      const isFileSize = th.classList.contains("file-size-sort");
      if (isFileSize) {
        sortFileSize(visibleTableRows, columnData);
      }

      const isRememberSort = sortableTable.classList.contains("remember-sort");
      if (!isRememberSort) {
        rememberSort(timesClickedColumn, columnIndexesClicked);
      }

      timesClickedColumn += 1;

      getColSpanData(sortableTable, colSpanData, colSpanSum);
      const tableProperties = {
        tableRows: visibleTableRows,
        columnData,
        isFileSize,
        isDataAttribute,
        colSpanData,
        colSpanSum,
      };
      getTableData(tableProperties);
      updateTable(tableProperties);
    });
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
if (typeof module == "object") {
  module.exports = tableSortJs;
}
