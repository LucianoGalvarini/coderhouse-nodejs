import fs from "fs";

if (!fs.existsSync("productos.json")) {
  fs.writeFileSync("productos.json", JSON.stringify([]));
}
if (!fs.existsSync("carritos.json")) {
  fs.writeFileSync("carritos.json", JSON.stringify([]));
}

export let products = JSON.parse(fs.readFileSync("productos.json"));
export let carts = JSON.parse(fs.readFileSync("carritos.json"));

export function writeJsonProduct() {
  fs.writeFileSync("productos.json", JSON.stringify(products, null, 2));
}

export function writeJsonCart() {
  fs.writeFileSync("carritos.json", JSON.stringify(carts, null, 2));
}
