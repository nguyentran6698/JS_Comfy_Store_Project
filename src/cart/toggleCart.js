import { getElement } from "../utils.js";
const closeCart = getElement(".cart-close");
const toggleCartBtn = getElement(".toggle-cart");
const cartOverlay = getElement(".cart-overlay");
closeCart.addEventListener("click", () => {
  cartOverlay.classList.remove("show");
});
toggleCartBtn.addEventListener("click", () => {
  cartOverlay.classList.add("show");
});
export const openCart = () => {
  cartOverlay.classList.add("show");
};
