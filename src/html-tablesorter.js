/*
  html-tablesorter
  Lee Wannacott - 2020
*/
console.log('hello world')

//console.log(document.getElementsByClassName('sortable'))

if (document.getElementsByClassName('sortable')) {
    const entireTable = document.getElementById('myTable')
    const tableColumn = document.getElementsByTagName('th');
    const tableRow = document.getElementsByTagName('tr').item(2);
    const tableBody = document.getElementsByTagName('tbody');

    console.log(tableRow)
    // for (let i; tableRow < tableRow.length; i++) {
    //     console.log(tableRow[i])
    // }


}
// const entireTable = document.getElementsByClassName('sortable')
// const tableColumn = document.getElementsByTagName('th');
// const tableRow = document.getElementsByTagName('tr');
// const tableBody = document.getElementsByTagName('tbody');

// console.log(entireTable)


// for (let column of tableInfo) {
//     console.log(column)
// }