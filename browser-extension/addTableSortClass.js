document.body.style.border = "1px solid red";

function getTables() {
  return document.querySelectorAll("table");
}
let tables = getTables();
console.log("tables", tables);
function addTableSortClass() {
  let tablesWithTableSortClass = Array.from(tables).map((table) => {
    return table.classList.add("table-sort");
  });
  return tablesWithTableSortClass;
}
addTableSortClass();
