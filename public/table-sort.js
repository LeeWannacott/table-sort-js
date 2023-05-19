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

  function inferSortClasses(tableRows, columnIndex, th) {
    const runtimeRegex = /^(\d+h)?\s?(\d+m)?\s?(\d+s)?$/i;
    const fileSizeRegex = /^([.0-9]+)\s?(B|KB|KiB|MB|MiB|GB|GiB|TB|TiB)/i;
    // Doesn't infer dates with delimiter "."; as could capture semantic version numbers.
    const dmyRegex = /^(\d\d?)[/-](\d\d?)[/-]((\d\d)?\d\d)/;
    const ymdRegex = /^(\d\d\d\d)[/-](\d\d?)[/-](\d\d?)/;
    const inferableClasses = {
      runtime: { regexp: runtimeRegex, class: "runtime-sort", count: 0 },
      filesize: { regexp: fileSizeRegex, class: "file-size-sort", count: 0 },
      dmyDates: { regexp: dmyRegex, class: "dates-dmy-sort", count: 0 },
      ymdDates: { regexp: ymdRegex, class: "dates-ymd-sort", count: 0 },
    };
    let classNameAdded = false;
    let regexNotFoundCount = 0;
    const threshold = Math.ceil(tableRows.length / 2);
    for (let tr of tableRows) {
      if (regexNotFoundCount >= threshold) {
        break;
      }
      const tableColumn = tr.querySelectorAll("td").item(columnIndex);
      let foundMatch = false;
      for (let key of Object.keys(inferableClasses)) {
        let classRegexp = inferableClasses[key].regexp;
        if (tableColumn.innerText) {
          if (tableColumn.innerText.match(classRegexp) !== null) {
            foundMatch = true;
            inferableClasses[key].count++;
          }
        }
        if (inferableClasses[key].count >= threshold) {
          th.classList.add(inferableClasses[key].class);
          classNameAdded = true;
          break;
        }
      }
      if (classNameAdded) {
        break;
      }
      if (!foundMatch) {
        regexNotFoundCount++;
        continue;
      }
    }
  }

  function makeTableSortable(sortableTable) {
    const table = {
      body: getTableBody(sortableTable),
      head: sortableTable.querySelector("thead"),
    };
    table.headers = table.head.querySelectorAll("th");
    table.rows = table.body.querySelectorAll("tr");

    let columnIndexesClicked = [];

    const isNoSortClassInference =
      sortableTable.classList.contains("no-class-infer");

    for (let [columnIndex, th] of table.headers.entries()) {
      if (!th.classList.contains("disable-sort")) {
        th.style.cursor = "pointer";
        if (!isNoSortClassInference) {
          inferSortClasses(table.rows, columnIndex, th);
        }
        makeEachColumnSortable(
          th,
          columnIndex,
          table,
          sortableTable,
          columnIndexesClicked
        );
      }
    }
  }

  function makeEachColumnSortable(
    th,
    columnIndex,
    table,
    sortableTable,
    columnIndexesClicked
  ) {
    const desc = th.classList.contains("order-by-desc");
    let tableArrows = sortableTable.classList.contains("table-arrows");
    const [arrowUp, arrowDown] = [" ▲", " ▼"];
    const fillValue = "!X!Y!Z!";

    if (desc && tableArrows) {
      th.insertAdjacentText("beforeend", arrowDown);
    } else if (tableArrows) {
      th.insertAdjacentText("beforeend", arrowUp);
    }

    function sortDataAttributes(tableRows, column) {
      for (let [i, tr] of tableRows.entries()) {
        let dataAttributeTd = getColumn(tr, column.spanSum, column.span).dataset
          .sort;
        column.toBeSorted.push(`${dataAttributeTd}#${i}`);
        columnIndexAndTableRow[column.toBeSorted[i]] = tr.outerHTML;
      }
    }

    function sortFileSize(tableRows, column) {
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
        let fileSizeTd = tr
          .querySelectorAll("td")
          .item(columnIndex).textContent;
        let match = fileSizeTd.match(numberWithUnitType);
        if (match) {
          let number = parseFloat(match[1]);
          let unit = match[2].toLowerCase();
          let multiplier = unitToMultiplier[unit];
          column.toBeSorted.push(`${number * multiplier}#${i}`);
        } else {
          column.toBeSorted.push(`${fillValue}#${i}`);
        }
      }
    }

    function sortByRuntime(tableRows, column) {
      try {
        for (let [i, tr] of tableRows.entries()) {
          const regexMinutesAndSeconds = /^(\d+h)?\s?(\d+m)?\s?(\d+s)?$/i;
          let columnOfTd = "";
          // TODO: github actions runtime didn't like textContent, tests didn't like innerText?
          if (testingTableSortJS) {
            columnOfTd = getColumn(tr, column.spanSum, column.span).textContent;
          } else {
            columnOfTd = getColumn(tr, column.spanSum, column.span).innerText;
          }
          let match = columnOfTd.match(regexMinutesAndSeconds);
          let [minutesInSeconds, hours, seconds] = [0, 0, 0];
          let timeinSeconds = columnOfTd;
          if (match) {
            const regexHours = match[1];
            if (regexHours) {
              hours = Number(regexHours.replace("h", "")) * 60 * 60;
            }
            const regexMinutes = match[2];
            if (regexMinutes) {
              minutesInSeconds = Number(regexMinutes.replace("m", "")) * 60;
            }
            const regexSeconds = match[3];
            if (regexSeconds) {
              seconds = Number(regexSeconds.replace("s", ""));
            }
            timeinSeconds = hours + minutesInSeconds + seconds;
          }
          column.toBeSorted.push(`${timeinSeconds}#${i}`);
          columnIndexAndTableRow[column.toBeSorted[i]] = tr.outerHTML;
        }
      } catch (e) {
        console.log(e);
      }
    }

    function sortDates(datesFormat, tableRows, column) {
      try {
        for (let [i, tr] of tableRows.entries()) {
          let columnOfTd, datesRegex;
          if (datesFormat === "mdy" || datesFormat === "dmy") {
            datesRegex = /^(\d\d?)[./-](\d\d?)[./-]((\d\d)?\d\d)/;
          } else if (datesFormat === "ymd") {
            datesRegex = /^(\d\d\d\d)[./-](\d\d?)[./-](\d\d?)/;
          }
          columnOfTd = getColumn(tr, column.spanSum, column.span).textContent;
          let match = columnOfTd.match(datesRegex);
          let [years, days, months] = [0, 0, 0];
          let numberToSort = columnOfTd;
          if (match) {
            const [regPos1, regPos2, regPos3] = [match[1], match[2], match[3]];
            if (regPos1 && regPos2 && regPos3) {
              if (datesFormat === "mdy") {
                [months, days, years] = [regPos1, regPos2, regPos3];
              } else if (datesFormat === "ymd") {
                [years, months, days] = [regPos1, regPos2, regPos3];
              } else {
                [days, months, years] = [regPos1, regPos2, regPos3];
              }
            }
            numberToSort = Number(
              years +
                String(months).padStart(2, "0") +
                String(days).padStart(2, "0")
            );
          }
          column.toBeSorted.push(`${numberToSort}#${i}`);
          columnIndexAndTableRow[column.toBeSorted[i]] = tr.outerHTML;
        }
      } catch (e) {
        console.log(e);
      }
    }

    function rememberSort() {
      // if user clicked different column from first column reset times clicked.
      columnIndexesClicked.push(columnIndex);
      if (timesClickedColumn === 1 && columnIndexesClicked.length > 1) {
        const lastColumnClicked =
          columnIndexesClicked[columnIndexesClicked.length - 1];
        const secondLastColumnClicked =
          columnIndexesClicked[columnIndexesClicked.length - 2];
        if (lastColumnClicked !== secondLastColumnClicked) {
          columnIndexesClicked.shift();
          timesClickedColumn = 0;
        }
      }
      return timesClickedColumn;
    }

    function getColSpanData(sortableTable, column) {
      sortableTable.querySelectorAll("th").forEach((th, index) => {
        column.span[index] = th.colSpan;
        if (index === 0) column.spanSum[index] = th.colSpan;
        else column.spanSum[index] = column.spanSum[index - 1] + th.colSpan;
      });
    }

    function getColumn(tr, colSpanSum, colSpanData) {
      return tr
        .querySelectorAll("td")
        .item(
          colSpanData[columnIndex] === 1
            ? colSpanSum[columnIndex] - 1
            : colSpanSum[columnIndex] - colSpanData[columnIndex]
        );
    }

    function getTableData(tableProperties) {
      const {
        tableRows,
        column,
        isFileSize,
        isTimeSort,
        isSortDates,
        isDataAttribute,
      } = tableProperties;
      for (let [i, tr] of tableRows.entries()) {
        let tdTextContent = getColumn(
          tr,
          column.spanSum,
          column.span
        ).textContent;
        if (tdTextContent.length === 0) {
          tdTextContent = "";
        }
        if (tdTextContent.trim() !== "") {
          if (isFileSize) {
            fileSizeColumnTextAndRow[column.toBeSorted[i]] = tr.outerHTML;
          }
          // These classes already handle pushing to column and setting the tr html.
          if (
            !isFileSize &&
            !isDataAttribute &&
            !isTimeSort &&
            !isSortDates.dayMonthYear &&
            !isSortDates.yearMonthDay &&
            !isSortDates.monthDayYear
          ) {
            column.toBeSorted.push(`${tdTextContent}#${i}`);
            columnIndexAndTableRow[`${tdTextContent}#${i}`] = tr.outerHTML;
          }
        } else {
          // Fill in blank table cells dict key with filler value.
          column.toBeSorted.push(`${fillValue}#${i}`);
          columnIndexAndTableRow[`${fillValue}#${i}`] = tr.outerHTML;
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

      if (column.toBeSorted[0] === undefined) {
        return;
      }

      function changeTableArrow(arrowDirection) {
        if (tableArrows) {
          clearArrows(arrowUp, arrowDown);
          th.insertAdjacentText("beforeend", arrowDirection);
        }
      }

      function sortColumn(sortDirection) {
        column.toBeSorted.sort(sortDirection, {
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
      const { tableRows, column, isFileSize } = tableProperties;
      for (let [i, tr] of tableRows.entries()) {
        if (isFileSize) {
          tr.innerHTML = fileSizeColumnTextAndRow[column.toBeSorted[i]];
          let fileSizeInBytesHTML = tr
            .querySelectorAll("td")
            .item(columnIndex).innerHTML;
          const fileSizeInBytesText = tr
            .querySelectorAll("td")
            .item(columnIndex).textContent;
          // Remove the unique identifyer for duplicate values(#number).
          column.toBeSorted[i] = column.toBeSorted[i].replace(/#[0-9]*/, "");
          const fileSize = parseFloat(column.toBeSorted[i]);
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
        } else if (!isFileSize) {
          tr.outerHTML = columnIndexAndTableRow[column.toBeSorted[i]];
        }
      }
    }

    let timesClickedColumn = 0;
    th.addEventListener("click", function () {
      const isRememberSort = sortableTable.classList.contains("remember-sort");
      if (!isRememberSort) {
        timesClickedColumn = rememberSort();
      }

      timesClickedColumn += 1;
      const column = {
        // column used for sorting; better name?
        toBeSorted: [],
        span: {},
        spanSum: {},
      };

      getColSpanData(sortableTable, column);

      const visibleTableRows = Array.prototype.filter.call(
        table.body.querySelectorAll("tr"),
        (tr) => {
          return tr.style.display !== "none";
        }
      );

      const isDataAttribute = th.classList.contains("data-sort");
      if (isDataAttribute) {
        sortDataAttributes(visibleTableRows, column);
      }

      const isFileSize = th.classList.contains("file-size-sort");
      if (isFileSize) {
        sortFileSize(visibleTableRows, column);
      }

      const isTimeSort = th.classList.contains("runtime-sort");
      if (isTimeSort) {
        sortByRuntime(visibleTableRows, column);
      }

      const isSortDates = {
        dayMonthYear: th.classList.contains("dates-dmy-sort"),
        monthDayYear: th.classList.contains("dates-mdy-sort"),
        yearMonthDay: th.classList.contains("dates-ymd-sort"),
      };
      // pick mdy first to override the inferred default class which is dmy.
      if (isSortDates.monthDayYear) {
        sortDates("mdy", visibleTableRows, column);
      } else if (isSortDates.yearMonthDay) {
        sortDates("ymd", visibleTableRows, column);
      } else if (isSortDates.dayMonthYear) {
        sortDates("dmy", visibleTableRows, column);
      }

      const tableProperties = {
        tableRows: visibleTableRows,
        column,
        isFileSize,
        isSortDates,
        isDataAttribute,
        isTimeSort,
      };
      getTableData(tableProperties);
      updateTable(tableProperties);
    });

    if (th.classList.contains("onload-sort")) {
      th.click();
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
if (typeof module == "object") {
  module.exports = tableSortJs;
}
