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

  function createMissingTableHead(sortableTable) {
    let createTableHead;
    if (testingTableSortJS === true) {
      createTableHead = domDocumentWindow.createElement("thead");
    } else {
      createTableHead = document.createElement("thead");
    }
    createTableHead.appendChild(sortableTable.rows[0]);
    sortableTable.insertBefore(createTableHead, sortableTable.firstChild);
  }

  function getTableBody(sortableTable) {
    if (sortableTable.getElementsByTagName("thead").length === 0) {
      createMissingTableHead(sortableTable);
      if (sortableTable.querySelectorAll("tbody").length > 1) {
        return sortableTable.querySelectorAll("tbody")[1];
      } else {
        return sortableTable.querySelector("tbody");
      }
    } else {
      return sortableTable.querySelector("tbody");
    }
  }

  function makeTableSortable(sortableTable) {
    const tableBody = getTableBody(sortableTable);
    const tableHead = sortableTable.querySelector("thead");
    const tableHeadHeaders = tableHead.querySelectorAll("th");

    for (let [columnIndex, th] of tableHeadHeaders.entries()) {
      if (!th.classList.contains("disable-sort")) {
        th.style.cursor = "pointer";
        makeEachColumnSortable(th, columnIndex, tableBody, sortableTable);
      }
    }
  }

  function sortDataAttributes(sortProperties) {
    const { tableRows, columnData, columnIndex } = sortProperties;
    for (let [i, tr] of tableRows.entries()) {
      const dataAttributeTd = tr.querySelectorAll("td").item(columnIndex)
        .dataset.sort;
      columnData.push(`${dataAttributeTd}#${i}`);
      columnIndexAndTableRow[columnData[i]] = tr.innerHTML;
    }
  }

  function getTableData(tableProperties, timesClickedColumn) {
    const {
      tableRows,
      th,
      columnData,
      isFileSize,
      isDataAttribute,
      colSpanData,
      colSpanSum,
      columnIndex,
      fillValue,
      tableArrows,
      arrowUp,
      arrowDown,
      desc,
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
    const { tableRows, columnData, isFileSize, columnIndex } = tableProperties;
    for (let [i, tr] of tableRows.entries()) {
      if (isFileSize) {
        tr.innerHTML = fileSizeColumnTextAndRow[columnData[i]];
        let fileSizeInBytesHTML = tr
          .querySelectorAll("td")
          .item(columnIndex).innerHTML;
        const fileSizeInBytesText = tr
          .querySelectorAll("td")
          .item(columnIndex).textContent;
        // Remove the unique identifyer for duplicate values(#number).
        columnData[i] = columnData[i].replace(/#[0-9]*/, "");
        const fileSize = parseFloat(columnData[i]);
        let prefixes = ["", "Ki", "Mi", "Gi", "Ti", "Pi"];
        let replaced = false;
        for (let i = 0; i < prefixes.length; ++i) {
          let nextPrefixMultiplier = 2 ** (10 * (i + 1));
          if (fileSize < nextPrefixMultiplier) {
            let prefixMultiplier = 2 ** (10 * i);
            fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
              fileSizeInBytesText,
              `${(fileSize / prefixMultiplier).toFixed(2)} ${prefixes[i]}B`
            );
            replaced = true;
            break;
          }
        }
        if (!replaced) {
          fileSizeInBytesHTML = fileSizeInBytesHTML.replace(
            fileSizeInBytesText,
            "NaN"
          );
        }
        tr.querySelectorAll("td").item(columnIndex).innerHTML =
          fileSizeInBytesHTML;
      } else {
        tr.innerHTML = columnIndexAndTableRow[columnData[i]];
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

  function sortFileSize(sortProperties) {
    const { tableRows, columnData, columnIndex, fillValue } = sortProperties;
    let unitToMultiplier = {
      b: 1,
      kb: 1000,
      kib: 2 ** 10,
      mb: 1e6,
      mib: 2 ** 20,
      gb: 1e9,
      gib: 2 ** 30,
      tb: 1e12,
      tib: 2 ** 40,
    };
    const numberWithUnitType = /([.0-9]+)\s?(B|KB|KiB|MB|MiB|GB|GiB|TB|TiB)/i;
    for (let [i, tr] of tableRows.entries()) {
      let fileSizeTd = tr.querySelectorAll("td").item(columnIndex).textContent;
      let match = fileSizeTd.match(numberWithUnitType);
      if (match) {
        let number = parseFloat(match[1]);
        let unit = match[2].toLowerCase();
        let multiplier = unitToMultiplier[unit];
        columnData.push(`${number * multiplier}#${i}`);
      } else {
        columnData.push(`${fillValue}#${i}`);
      }
    }
  }

  function rememberSort(sortProperties, timesClickedColumn) {
    const { columnIndexesClicked, columnIndex } = sortProperties;
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

  function getVisibleTableRoes(tableBody) {
    const visibleTableRows = Array.prototype.filter.call(
      tableBody.querySelectorAll("tr"),
      (tr) => {
        return tr.style.display !== "none";
      }
    );
    return visibleTableRows;
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

    let [timesClickedColumn, columnIndexesClicked] = [0, []];

    th.addEventListener("click", function () {
      const [columnData, colSpanData, colSpanSum] = [[], {}, {}];

      const visibleTableRows = getVisibleTableRoes(tableBody);

      const sortProperties = {
        tableRows: visibleTableRows,
        columnData,
        columnIndex,
        timesClickedColumn,
        columnIndexesClicked,
        fillValue,
      };

      const isDataAttribute = th.classList.contains("data-sort");
      if (isDataAttribute) {
        sortDataAttributes(sortProperties);
      }

      const isFileSize = th.classList.contains("file-size-sort");
      if (isFileSize) {
        sortFileSize(sortProperties);
      }

      const isRememberSort = sortableTable.classList.contains("remember-sort");
      if (!isRememberSort) {
        rememberSort(sortProperties, timesClickedColumn);
      }

      timesClickedColumn += 1;

      getColSpanData(sortableTable, colSpanData, colSpanSum);

      const tableProperties = {
        tableRows: visibleTableRows,
        th,
        columnData,
        isFileSize,
        isDataAttribute,
        colSpanData,
        colSpanSum,
        columnIndex,
        arrowUp,
        arrowDown,
        tableArrows,
        desc,
        fillValue,
      };

      getTableData(tableProperties, timesClickedColumn);
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
