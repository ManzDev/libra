import { addColumn } from "./addColumn.js";

const table = document.querySelector("table.compare");

const FIELDS = [
  { name: "Nombre", icon: "Description" },
  { name: "Descripción", icon: "Description" },
  { name: "Features", icon: "Version" },
  { name: "Links", icon: "Links" },
  { name: "Descargas NPM", icon: "Downloads" },
  { name: "Stats", icon: "Stats" },
  { name: "Topics", icon: "Hashtag" }
];

const addHeader = () => {
  FIELDS.forEach(({ name, icon }) => {
    const tr = document.createElement("tr");
    tr.setHTMLUnsafe(/* html */`
      <th>
        <img src="/icons/${icon.toLowerCase()}.svg" alt="${icon}">
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
