import { writeProduct } from "./files.js";
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
  constructor(id, timestampCart, productos) {
    this.id = id;
    this.timestampCart = timestampCart;
    this.productos = productos;
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
  const product = productos[id - 1];

  if (productos.indexOf(product) === -1) {
    alert("No existe un producto con el id buscado");
  } else {
    product.nombre = data.nombre;
    product.descripcion = data.descripcion;
    product.codigo = data.codigo;
    product.thumbnail = data.thumbnail;
    product.precio = data.precio;
    product.stock = data.stock;

    writeProduct(product);
  }

  return product;
}
