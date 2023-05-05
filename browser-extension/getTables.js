document.body.style.border = "1px solid red";

let tables = document.querySelectorAll("table");
console.log("tables", tables);
let tables2 = Array.from(tables).map((table) => {
  return table.classList.add("table-sort");
});
console.log("tables2", tables2);

