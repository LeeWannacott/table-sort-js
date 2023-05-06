// let tables = document.querySelectorAll("table").querySelectorAll("th");
// console.log("tables3", tables);
let headers = document.querySelectorAll("table th");
console.log("tables3", headers);

let headerText = headers.map((header)=>header.innerHTML)
console.log(headerText)
