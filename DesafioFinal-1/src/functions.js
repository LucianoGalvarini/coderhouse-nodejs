import { writeProduct } from "./files.js";

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
export function actualizarProducto(data) {
  // const product = productos[req.params.id - 1];

  // if (productos.indexOf(product) === -1) {
  //   res.json(msg);
  // } else {
  //   product.title = req.body.title;
  //   product.price = req.body.price;
  //   product.thumbnail = req.body.thumbnail;

  //   res.json(product);
  // }

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
