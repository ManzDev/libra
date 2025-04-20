const TOTAL_RESULTS = 8;
const optionTemplate = (name) => /* html */`<option value="${name}">${name}</option>`;

const table = document.querySelector("table.compare");

export const addDatalist = (input) => {

  if (input.value.length <= 3) return;

  const text = input.value.replace(/[^a-z0-9@/-]/g, "");
  const datalist = input.nextElementSibling;

  fetch(`https://registry.npmjs.org/-/v1/search?text=${text}&size=${TOTAL_RESULTS}`)
    .then(res => res.json())
    .then(data => {
      const results = data.objects.map(object => object.package.name);
      datalist.setHTMLUnsafe("");
      datalist.setHTMLUnsafe(results.map(name => optionTemplate(name)).join(""));
    });
}

// Autocompleted
table.addEventListener("input", (ev) => {
  const isSearch = ev.target.nodeName === "INPUT" && ev.target.classList.contains("search");

  if (isSearch) {
    const input = ev.target;
    addDatalist(input);
  }

});
