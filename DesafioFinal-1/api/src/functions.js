import {
  writeProduct,
  updateProduct,
  deleteProduct,
  writeCarrito,
  saveProdCart,
} from "./files.js";
import { products, carts } from "./files.js";

class Product {
  constructor(nombre, descripcion, codigo, thumbnail, precio, stock) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.codigo = codigo;
    this.thumbnail = thumbnail;
    this.precio = precio;
    this.stock = stock;
  }
}

class Carrito {
  constructor() {
    this.products = [];
  }
}

export function cargarProducto(data) {
  let product = new Product(
    data.nombre,
    data.descripcion,
    data.codigo,
    data.thumbnail,
    data.precio,
    data.stock
  );
  writeProduct(product);

  return product;
}
export function actualizarProducto(data, id) {
  let product = {};

  products.map((prod) => {
    if (prod.id == id) {
      product = prod;
    }
  });

  if (product === {}) {
    let msg = {
      error: "No existe un producto con el id buscado",
    };
    console.log(msg);
  } else {
    product.nombre = data.nombre;
    product.descripcion = data.descripcion;
    product.codigo = data.codigo;
    product.thumbnail = data.thumbnail;
    product.precio = data.precio;
    product.stock = data.stock;
  }

  updateProduct(product);

  return product;
}

export function borrarProducto(id) {
  const index = products.findIndex((product) => product.id === id);
  products.splice(index, 1);

  deleteProduct();
  return products;
}

/* ------------------------------------------------------------ */

export function cargarCarrito() {
  let carrito = new Carrito();

  let lastId = carts.reduce(
    (acc, item) => (item.id > acc ? (acc = item.id) : acc),
    0
  );
  let newCart = {
    id: lastId + 1,
    timestamp: new Date().toLocaleString(),
    ...carrito,
  };

  writeCarrito(newCart);

  return newCart.id;
}

export function mostrarCarrito() {
  
}

export function addProdCart(idCart, idProd) {
  const index = products.findIndex((product) => product.id == idProd);

  saveProdCart(idCart, products[index]);
  return products;
}
