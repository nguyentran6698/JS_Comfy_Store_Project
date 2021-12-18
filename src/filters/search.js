import { getElement } from "../utils.js";
import display from "../displayProducts.js";
const setupSearch = (store) => {
  const formInput = getElement(".input-form");
  const nameInput = getElement(".search-input"); //we need the value
  formInput.addEventListener("keyup", () => {
    const value = nameInput.value;
    if (value) {
      const products = store.filter(({ name }) =>
        name.toLowerCase().startsWith(value)
      );
      display(products, getElement(".products-container"), true);
      if (products.length < 1) {
        const container = getElement(".products-container");
        container.innerHTML = `<h3 class = "filter-error"> Sorry, no product matched your search</h3>`;
      }
    } else {
      display(store, getElement(".products-container"), true);
    }
  });
};

export default setupSearch;
