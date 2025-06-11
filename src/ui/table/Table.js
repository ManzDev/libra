import { addColumn } from "@/ui/table/Column.js";
import "./Table.css";

const table = document.querySelector("table.compare");

const FIELDS = [
  { name: "Name", icon: null },
  { name: "Description", icon: "Description" },
  { name: "Features", icon: "Version" },
  { name: "Links", icon: "Links" },
  { name: "Downloads", icon: "Downloads" },
  { name: "Stats", icon: "Stats" },
  { name: "Sizes", icon: "Weight" },
  { name: "Topics", icon: "Hashtag" }
];

const addHeader = () => {
  FIELDS.forEach(({ name, icon }) => {
    const tr = document.createElement("tr");
    const svgIcon = icon ? `<img src="/icons/${icon.toLowerCase()}.svg" alt="${icon}">` : "";
    tr.setHTMLUnsafe(/* html */`
      <th>
        ${svgIcon}
        ${name}
      </th>
    `);
    table.append(tr);
  });
};

export const createTable = () => {
  addHeader();
  addColumn();
};
