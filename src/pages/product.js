// global imports
import "../toggleSidebar.js";
import "../cart/toggleCart.js";
import "../cart/setupCart.js";
// specific
import { addToCart } from "../cart/setupCart.js";
import { singleProductUrl, getElement, formatPrice } from "../utils.js";

// selections
const loading = getElement(".page-loading");
const centerDOM = getElement(".single-product-center");
const pageTitleDOM = getElement(".page-hero-title");
const imgDOM = getElement(".single-product-img");
const titleDOM = getElement(".single-product-title");
const companyDOM = getElement(".single-product-company");
const priceDOM = getElement(".single-product-price");
const colorsDOM = getElement(".single-product-colors");
const descDOM = getElement(".single-product-desc");
const cartBtn = getElement(".addToCartBtn");

// cart product
let productID;

// show product when page loads
window.addEventListener("DOMContentLoaded", async () => {
  loading.style.display = "none";
  const urlID = window.location.search;
  const url = `${singleProductUrl}${urlID}`;
  try {
    const data = await fetch(url);

    if (data.status >= 200 && data.status <= 299) {
      const singleProduct = await data.json();
      productID = singleProduct.id;
      const {
        colors,
        company,
        price,
        name,
        image,
        description,
      } = singleProduct.fields;
      let img = image[0].thumbnails.large.url;
      pageTitleDOM.textContent = `Home / ${name}`;
      imgDOM.src = img;
      titleDOM.textContent = name;
      companyDOM.textContent = company;
      priceDOM.textContent = `${formatPrice(price)}`;
      descDOM.textContent = description;
      colors.forEach((color) => {
        const span = document.createElement("span");
        span.classList.add("product-color");
        span.style.backgroundColor = color;
        colorsDOM.appendChild(span);
      });
    } else {
      console.log(data.status, data.statusText);
      centerDOM.innerHTML = `
        <div>
        <h3 class = "error">sorry, something went wrong</h3>
        <a href="index.html" class="btn">Back Home </a>
        </div>
        `;
    }
  } catch (error) {
    console.log(error);
  }
});
cartBtn.addEventListener("click", () => {
  console.log(productID);
  addToCart(productID);
});
