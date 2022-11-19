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
