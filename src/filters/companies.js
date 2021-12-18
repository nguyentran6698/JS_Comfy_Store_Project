import { getElement } from "../utils.js";
import display from "../displayProducts.js";

const setupCompanies = (store) => {
  let companies = ["all", ...new Set(store.map(({ company }) => company))];
  const companyContainer = getElement(".companies");
  companyContainer.innerHTML = companies
    .map((item) => {
      return `<button class="company-btn">${item}</button>`;
    })
    .join("");
  //   const newArray = store.reduce(
  //     (newArray, current) => {
  //       if (!newArray.includes(current.company)) {
  //         newArray.push(current.company);
  //       }
  //       return newArray;
  //     },
  //     ["all"]                  This method is old way
  //   );
  //   companyContainer.innerHTML = newArray
  //     .map((item) => {
  //       return `<button class="company-btn">${item}</button>`;
  //     })
  //     .join("");
  const filterBtns = document.querySelectorAll(".company-btn");
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      const element = e.target;
      let newStore;
      if (element.textContent === "all") {
        newStore = [...store];
      } else {
        newStore = store.filter(
          (product) => product.company === element.textContent
        );
      }
      display(newStore, getElement(".products-container"), true);
    });
  });
};
export default setupCompanies;
