// let tables = window.document.querySelectorAll("table");
// console.log(getTableHeaders())
let headers = document.querySelectorAll("table th");
console.log(headers)
let headerNames = Array.from(headers).map((header) => header.innerText);
console.log("nnnn");


headerNames.forEach((name) => {
  const btn = document.createElement("button");
  console.log(name);
  btn.innerText = name;

  document.querySelector("#popup-content").appendChild(btn);
  let test = document.querySelector("#popup-content");
  console.log(test);
})
