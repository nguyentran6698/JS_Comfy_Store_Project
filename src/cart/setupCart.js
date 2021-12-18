// import
import {
  getStorageItem,
  setStorageItem,
  formatPrice,
  getElement,
} from "../utils.js";
import { openCart } from "./toggleCart.js";
import { findProduct, store } from "../store.js";
import addToCartDOM from "./addToCartDOM.js";
// set items

const cartItemCountDOM = getElement(".cart-item-count");
const cartItemsDOM = getElement(".cart-items");
const cartTotalDOM = getElement(".cart-total");

let cart = getStorageItem("cart");
export const addToCart = (id) => {
  let item = cart.find((item) => item.id === id);
  if (!item) {
    let productFound = findProduct(id);
    // add item to the cart
    productFound = { ...productFound, amount: 1 };
    cart = [...cart, productFound];
    // add item to the DOM
    addToCartDOM(productFound);
    //
  } else {
    //updates value
    const amount = increaseAmount(id);
    const items = [...cartItemsDOM.querySelectorAll(".cart-item-amount")];
    const newAmount = items.find((value) => value.dataset.id === id);
    newAmount.textContent = amount;
  }
  // add one to item count
  displayCartItemCount();
  // display cart total
  displayCartTotal();
  // set cart in local storage
  setStorageItem("cart", cart);
  //more stuffs comming up
  openCart();
};
function displayCartTotal() {
  const amount = cart.reduce((total, cartItem) => {
    total += cartItem.price * cartItem.amount;
    return total;
  }, 0);
  cartTotalDOM.textContent = `Total: ${formatPrice(amount)}`;
}
function displayCartItemCount() {
  const amount = cart.reduce((total, cartItem) => {
    total += cartItem.amount;
    return total;
  }, 0);
  cartItemCountDOM.textContent = amount;
}
function displayCartItemDOM() {
  cart.forEach((item) => {
    addToCartDOM(item);
  });
}
function increaseAmount(id) {
  let newAmount;
  cart = cart.map((item) => {
    if (item.id === id) {
      newAmount = item.amount + 1;
      item = { ...item, amount: item.amount + 1 };
    }
    return item;
  });
  return newAmount;
}
function decreaseAmount(id) {
  let newAmount;
  cart = cart.map((item) => {
    if (item.id === id) {
      newAmount = item.amount - 1;
      item = { ...item, amount: item.amount - 1 };
    }
    return item;
  });
  return newAmount;
}
function setupCartFunctionality() {
  cartItemsDOM.addEventListener("click", function (e) {
    const parent = e.target.parentElement;
    const id = e.target.dataset.id;
    const parentID = e.target.parentElement.dataset.id;
    //remove
    if (e.target.classList.contains("cart-item-remove-btn")) {
      // for database
      removeItem(id);
      // for DOM
      parent.parentElement.remove();
    }
    // increase
    if (parent.classList.contains("cart-item-increase-btn")) {
      const newAmount = increaseAmount(parentID);
      console.log(newAmount);

      parent.nextElementSibling.textContent = newAmount;
    }
    // decrease
    if (parent.classList.contains("cart-item-decrease-btn")) {
      const newAmount = decreaseAmount(parentID);
      if (newAmount === 0) {
        // for database
        removeItem(parentID);
        // for DOM
        parent.parentElement.parentElement.remove();
      } else {
        parent.previousElementSibling.textContent = newAmount;
      }
    }
    displayCartTotal();
    displayCartItemCount();
    setStorageItem("cart", cart);
  });
}
function removeItem(id) {
  cart = cart.filter((item) => {
    return item.id !== id;
  });
}
const init = () => {
  // display amount of cart items
  displayCartItemCount();
  // display total
  displayCartTotal();
  // ADD all cart items to the dom
  displayCartItemDOM();
  // setup cart functionality
  setupCartFunctionality();
};
init();
