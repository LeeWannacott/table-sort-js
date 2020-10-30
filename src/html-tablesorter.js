/*
  html-tablesorter
  Lee Wannacott - 2020
*/
console.log('hello world')

if (document.getElementsByClassName(/[sortable]/)) {
  const columnData = [];
  const dictOfColumnIndexAndTableRow = {
  }
  document.addEventListener("DOMContentLoaded", function (e) {
    for (let sortableTable of document.getElementsByTagName('table')) {
      if (sortableTable.className === 'sortable') {
        if (!sortableTable.getElementsByTagName('thead')) {
          console.log('<thead> Tag does not exist');
        }
        else if (!sortableTable.getElementsByTagName('tbody')) {
          console.log('<tbody> Tag does not exist');
        }
        else {
          const tableHead = sortableTable.querySelector('thead')
          const tableBody = sortableTable.querySelector('tbody')
          const tableHeadHeaders = tableHead.querySelectorAll('th')
          for (let [columnIndex, th] of tableHeadHeaders.entries()) {
            th.addEventListener("click", function () {
              //console.log(th.innerText, columnIndex);
              function getTableDataOnClick() {
                const tableRows = tableBody.querySelectorAll('tr');
                for (let [i, tr] of tableRows.entries()) {
                  columnData.push(tr.querySelectorAll('td').item(columnIndex).innerHTML)
                  dictOfColumnIndexAndTableRow[tr.querySelectorAll('td').item(columnIndex).innerHTML] = tr.innerHTML
                }
                if (columnData[0].search(/[^A-Za-z]/)) {
                  console.log('alpha')
                  columnData.sort()
                } else if (columnData[0].search(/[^0-9]/)) {
                  console.log('number')
                  console.log(columnData)
                  for (let [i, number] of columnData.entries()) {
                    if (typeof (number === String)) {
                      columnData[i] = parseFloat(number)
                    }
                  }
                  console.log(columnData)
                  columnData.sort(function (a, b) {
                    if (a > b)
                      return 1;
                    if (a < b)
                      return -1;
                    return 0
                  });

                }
              }

              getTableDataOnClick();

              function sortingFunction() {

                const tableRows = tableBody.querySelectorAll('tr');
                for (let [i, tr] of tableRows.entries()) {
                  tr.innerHTML = dictOfColumnIndexAndTableRow[columnData[i]]
                }

                columnData.length = 0
              }
              sortingFunction()
            });
          }
        }
      }
    }
  })
}

// Regular Expressions
// Date = /^(\d\d?)[\/\.-](\d\d?)[\/\.-]((\d\d)?\d\d)$/;
// Alpha = [a-z]
// Number = [0-9]


