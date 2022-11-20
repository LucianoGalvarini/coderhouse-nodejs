import { writeProduct, updateProduct, deleteProduct } from "./files.js";
import { products } from "./files.js";

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
  constructor(id, timestampCart, products) {
    this.id = id;
    this.timestampCart = timestampCart;
    this.products = products;
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
  let product = products[id - 1];

  if (products.indexOf(product) === -1) {
    let msg = {
      error: "No existe un producto con el id buscado",
    };
    alert(msg);
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
  products.splice(id - 1, 1);
  deleteProduct();
  return products;
}
