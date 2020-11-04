//console.log('hello world')

if (document.getElementsByClassName(/[sortable]/)) {
  const columnData = [];
  const dictOfColumnIndexAndTableRow = {
  }
  document.addEventListener("DOMContentLoaded", function (e) {
    for (let sortableTable of document.getElementsByTagName('table')) {
      if (sortableTable.className === 'sortable') {
        if (!sortableTable.getElementsByTagName('thead')) {
          console.log('<thead> Tag does not exist in table');
        }
        else if (!sortableTable.getElementsByTagName('tbody')) {
          console.log('<tbody> Tag does not exist in table');
        }
        else {
          const tableHead = sortableTable.querySelector('thead')
          const tableBody = sortableTable.querySelector('tbody')
          const tableHeadHeaders = tableHead.querySelectorAll('th')
         
          for (let [columnIndex, th] of tableHeadHeaders.entries('table')) {
            let timesClickedColumn = 0
            th.addEventListener("click", function () {
              timesClickedColumn +=1
              function getTableDataOnClick() {
                const tableRows = tableBody.querySelectorAll('tr');
                for (let [i, tr] of tableRows.entries()) {
                  columnData.push(`${tr.querySelectorAll('td').item(columnIndex).innerHTML}#${i}`)
                  dictOfColumnIndexAndTableRow[`${tr.querySelectorAll('td').item(columnIndex).innerHTML}#${i}`] = tr.innerHTML
                }
                // Sort Alphabetically
                console.log(columnData[0])
                if (columnData[0].search(/[^A-Za-z]/)) {
                  //console.log('alpha')
                  if (timesClickedColumn === 1){                  
                    columnData.sort()
                  } else if (timesClickedColumn === 2){
                    columnData.reverse();
                    timesClickedColumn = 0
                  }
                  // Sort Numbers and dates.
                } else if (columnData[0].search(/[^0-9]/)) {
                  //console.log('number')
                  if (timesClickedColumn === 1){
                  columnData.sort((a, b) => a.localeCompare(b, navigator.languages[0] || navigator.language,
                     {numeric: true, ignorePunctuation: true}))} 
                 
                  else if(timesClickedColumn === 2){
                    columnData.sort((b, a) => a.localeCompare(b, navigator.languages[0] || navigator.language,
                       {numeric: true,ignorePunctuation: true}))
                    timesClickedColumn = 0
                  }
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