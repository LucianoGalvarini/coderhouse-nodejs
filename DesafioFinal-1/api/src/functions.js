import { writeJsonProduct, writeJsonCart } from "./files.js";
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

  let lastId = products.reduce(
    (acc, item) => (item.id > acc ? (acc = item.id) : acc),
    0
  );
  let newProduct = {
    id: lastId + 1,
    timestamp: new Date().toLocaleString(),
    ...product,
  };

  products.push(newProduct);

  writeJsonProduct();

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

  let idProductos = products.map((product) => product.id);

  if (idProductos.indexOf(product.id) === -1) {
    products.push(product);
  }

  writeJsonProduct();
  return product;
}

export function borrarProducto(id) {
  const index = products.findIndex((product) => product.id === id);
  products.splice(index, 1);

  writeJsonProduct();
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
  carts.push(newCart);

  writeJsonCart();
  return newCart.id;
}

export function mostrarCarrito(idCart) {
  const index = carts.findIndex((cart) => cart.id == idCart);

  return carts[index];
}

export function addProdCart(idCart, idProd) {
  const prodsCartSelect = carts[idCart - 1].products;
  const index = products.findIndex((product) => product.id == idProd);
  const productSelect = products[index];

  let productStock = {
    ...productSelect,
  };

  const indexProdCart = prodsCartSelect.findIndex(
    (prod) => prod.id == products[index].id
  );

  if (indexProdCart !== -1) {
    prodsCartSelect.splice(indexProdCart, 1);
    products[index].stock--;
    productStock.stock++;
    prodsCartSelect.push(productStock);
  } else {
    productStock.stock = 1;
    products[index].stock--;
    prodsCartSelect.push(productStock);
  }

  writeJsonProduct();
  writeJsonCart();
  return products;
}

export function deleteCartProd(idCart, idProd) {
  const indexCart = carts.findIndex((cart) => cart.id == idCart);
  const indexProd = carts[indexCart].products.findIndex(
    (prod) => prod.id == idProd
  );

  carts[indexCart].products.splice(indexProd, 1);
  writeJsonCart();
}

export function deleteCart(idCart) {
  const indexCart = carts.findIndex((cart) => cart.id == idCart);
  carts.splice(indexCart, 1);

  writeJsonCart();
}
