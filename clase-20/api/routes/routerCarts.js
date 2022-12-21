const express = require("express");
const {
  addCart,
  deleteCart,
  getProducts,
  addProduct,
  deleteProduct,
} = require("../controllers/controllerCarts.js");
const routerCarts = express.Router();

//Add cart
routerCarts.post("/", addCart);

//Delete cart
routerCarts.delete("/:id", deleteCart);

//Get products from cart
routerCarts.get("/:id/products", getProducts);

//Add product to cart
routerCarts.post("/:id/products", addProduct);

//Delete product from cart
routerCarts.delete("/:id/products/:id_prod", deleteProduct);

module.exports = routerCarts;
