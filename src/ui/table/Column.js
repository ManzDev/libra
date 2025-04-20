import { SearchInput } from "@/ui/input/SearchInput.js";
import "./Column.css";

export const addColumn = () => {
  const rows = [...document.querySelectorAll("table.compare > tr")];
  const column = [];
  rows.forEach(row => {
    const cell = document.createElement("td");
    column.push(cell);
    row.append(cell);
  });

  column[0].insertAdjacentHTML("beforeend", SearchInput);
  column[0].querySelector("input").focus();
  return column;
};
