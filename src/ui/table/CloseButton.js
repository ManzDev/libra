import "./CloseButton.css";

const table = document.querySelector("table.compare");

export const addCloseButton = (element) => {
  const closeButton = document.createElement("button");
  closeButton.classList.add("close");
  closeButton.textContent = "✕";
  element.append(closeButton);
};

table.addEventListener("click", (ev) => {
  const isClose = ev.target.nodeName === "BUTTON" && ev.target.className === "close";

  if (isClose) {
    const index = ev.target.parentElement.cellIndex;
    const rows = [...table.querySelectorAll(`tr > :nth-child(${index + 1})`)];
    rows.forEach(row => row.remove());
  }
});
