import { getStorageItem, setStorageItem } from "./utils.js";
let store = getStorageItem("store");
const setupStore = (products) => {
  store = products.map((product) => {
    const {
      id,
      fields: { featured, name, price, colors, company, image: img },
    } = product;
    const image = img[0].thumbnails.large.url;
    return {
      id,
      featured,
      name,
      price,
      colors,
      company,
      image,
    };
  });
  setStorageItem("store", store);
};

const findProduct = (id) => {
  const productTarget = store.find((item) => item.id === id);
  return productTarget;
};
// same as export let store export const setupStore
export { store, setupStore, findProduct };
