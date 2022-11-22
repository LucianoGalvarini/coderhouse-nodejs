import fs from "fs";

if (!fs.existsSync("productos.json")) {
  fs.writeFileSync("productos.json", JSON.stringify([]));
}
if (!fs.existsSync("carritos.json")) {
  fs.writeFileSync("carritos.json", JSON.stringify([]));
}

export let products = JSON.parse(fs.readFileSync("productos.json"));
export let carts = JSON.parse(fs.readFileSync("carritos.json"));

export function writeProduct(data) {
  let lastId = products.reduce(
    (acc, item) => (item.id > acc ? (acc = item.id) : acc),
    0
  );
  let newProduct = {
    id: lastId + 1,
    timestamp: new Date().toLocaleString(),
    ...data,
  };
  products.push(newProduct);
  fs.writeFileSync("productos.json", JSON.stringify(products, null, 2));
}

export function updateProduct(data) {
  let idProductos = products.map((product) => product.id);

  if (idProductos.indexOf(data.id) === -1) {
    products.push(data);
  }

  fs.writeFileSync("productos.json", JSON.stringify(products, null, 2));
}

export function deleteProduct() {
  fs.writeFileSync("productos.json", JSON.stringify(products, null, 2));
}

/* --------------------------------------------------------------------------- */

export function writeCarrito(data) {
  carts.push(data);
  fs.writeFileSync("carritos.json", JSON.stringify(carts, null, 2));
}

export function saveProdCart(idCart, data) {
  console.log(data);
  console.log(idCart);
  carts[idCart - 1].products.push(data);
  fs.writeFileSync("carritos.json", JSON.stringify(carts, null, 2));
}
