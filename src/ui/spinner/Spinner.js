import "./Spinner.css";

export const addSpinner = () => {
  const image = "icons/spinner.svg";

  return /* html */`<img class="loading" src="${image}" alt="Loading...">`;
}
