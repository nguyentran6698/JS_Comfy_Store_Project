import { getElement } from "./utils.js";
const closeBtn = getElement(".sidebar-close");
const toggleNav = getElement(".toggle-nav");
const sidebar = getElement(".sidebar-overlay");
closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("show");
});
toggleNav.addEventListener("click", () => {
  sidebar.classList.add("show");
});
