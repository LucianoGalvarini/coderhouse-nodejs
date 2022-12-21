const Carts = require("./containerCarts.js");

const carts = new Carts();
let admin;

//Add a cart
const addCart = async (req, res) => {
  await carts.save(req.body);
  res.json({ message: "Carrito agregado" });
};

//Delete cart
const deleteCart = async (req, res) => {
  await carts.deleteById(req.params.id);
  res.json({ message: "Carrito eliminado" });
};

//Get products from cart
const getProducts = async (req, res) => {
  const cartSelected = await carts.getProducts(req.params.id);
  res.send(cartSelected);
};

//Add product to cart
const addProduct = (req, res) => {
  carts.saveProduct(req.body.idCart, req.params.id);
  res.json({ message: "Producto agregado" });
};

//Delete product from cart
const deleteProduct = (req, res) => {
  carts.deleteProduct(req.params.id, req.params.id_prod);
  res.json({ message: "Producto eliminado" });
};

module.exports = {
  addCart,
  deleteCart,
  getProducts,
  addProduct,
  deleteProduct,
};
