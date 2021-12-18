import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupPrice = (store) => {
  const priceInput = getElement(".price-filter");
  const priceValue = getElement(".price-value");

  // setupfilter
  let maxPrice = store.map((product) => {
    return product.price;
  });
  maxPrice = Math.max(...maxPrice);
  maxPrice = Math.ceil(maxPrice / 100);
  priceInput.max = maxPrice;
  priceInput.min = 0;
  let priceRandom = Math.floor(Math.random() * maxPrice);
  priceInput.value = priceRandom;
  priceValue.textContent = `Value: $${priceRandom}`;
  // input event
  priceInput.addEventListener("input", function () {
    const value = parseInt(priceInput.value);
    priceValue.textContent = `Value: $${value}`;
    let newStore = store.filter((product) => product.price / 100 <= value);

    const container = getElement(".products-container");
    if (newStore.length < 1) {
      container.innerHTML = `<h3 class = "filter-error"> Sorry, no product matched the filter </h3>`;
    } else {
      display(newStore, container, true);
    }
  });
};

export default setupPrice;
