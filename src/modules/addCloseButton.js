export const addCloseButton = (element) => {
  const closeButton = document.createElement("button");
  closeButton.classList.add("close");
  closeButton.textContent = "✕";
  element.append(closeButton);
};
