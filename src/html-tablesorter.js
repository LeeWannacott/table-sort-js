/*
  html-tablesorter
  Lee Wannacott - 2020
*/
console.log('hello world')


if (document.getElementsByClassName('sortable')) {
  const columnData = []
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
              console.log(th.innerText, columnIndex);
              function getColumnDataOnClick() {


                const tableRows = tableBody.querySelectorAll('tr');
                for (let [i, tr] of tableRows.entries()) {


                  columnData.push(tr.querySelectorAll('td').item(columnIndex).innerText)
                  console.log(tr.querySelectorAll('td').item(columnIndex).innerText)
                  console.log(columnData)

                }
              }

              getColumnDataOnClick();
            });
          }
          console.log(tableBody)


        }
      }
    }
  })
}


