const PLACEHOLDER = "ej: react";
const INPUT = /* html */`<input type="search" placeholder="${PLACEHOLDER}">`;

export const addColumn = () => {
  const rows = [...document.querySelectorAll("table.compare tr")];
  const column = [];
  rows.forEach(row => {
    const cell = document.createElement("td");
    column.push(cell);
    row.append(cell);
  });

  console.log({ rows, column });

  column[0].insertAdjacentHTML("beforeend", INPUT);
  column[0].querySelector("input").focus();
  return column;
};
