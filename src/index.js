import Data from "@/data/DataPackage.js";

// ui
import { createTable } from "./ui/table/Table.js";

createTable();

// Debug temporal
document.body.addEventListener("click", () => {
  window.Data = Data;
})
