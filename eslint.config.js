import { recommended } from "eslint-config-manzdev";

export default [
  ...recommended,
  {
    rules: {
      "unused-imports/no-unused-imports": "warning",
      "unused-imports/no-unused-vars": "off",
      "simple-import-sort/imports": "warning",
      "simple-import-sort/exports": "warning",
    }
  }
];
