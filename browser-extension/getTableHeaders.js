function getTableHeaders() {
  let headers = document.querySelectorAll("table th");
  let headerNames = Array.from(headers).map((header) => header.innerText);
  console.log("test", headerNames);
  return headerNames;
}
getTableHeaders();
