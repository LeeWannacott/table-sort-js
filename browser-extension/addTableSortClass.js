const tables = document.querySelectorAll("table");

Array.from(tables).map((table) => {
  return table.classList.add("table-sort");
});
