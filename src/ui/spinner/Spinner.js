import "./Spinner.css";

export const addSpinner = () => {
  const image = "images/spinner.svg";

  return /* html */`<img class="loading" src="${image}" alt="Loading...">`;
}
