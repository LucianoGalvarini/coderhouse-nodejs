const express = require("express");
const { Router } = express;
const path = require("path");
const app = express();
const routerProduct = Router();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// --------------------------------------------------------------------------------------------------------

let productos = [];
let msg = { error: "producto no encontrado" };

// Devuelve todos los productos

routerProduct.get("/", (req, res) => {
  res.json(productos);
});

// Devuelve un producto por id

routerProduct.get("/:id", (req, res) => {
  if (productos.indexOf(productos[req.params.id - 1]) === -1) {
    res.json(msg);
  } else {
    res.json(productos[req.params.id - 1]);
  }
});

// Recibe y agrega un producto y lo devuelve con su id asignado

routerProduct.post("/", (req, res) => {
  if (productos.length > 0) {
    let lastId = productos.reduce(
      (acc, item) => (item.id > acc ? (acc = item.id) : acc),
      0
    );

    let newProduct = {
      id: lastId + 1,
      ...req.body,
    };

    productos.push(newProduct);
    res.json(newProduct);
  } else {
    let newProduct = {
      id: 1,
      ...req.body,
    };

    productos.push(newProduct);
    res.json(newProduct);
  }
});

// Recibe y actualiza un producto segun su id

routerProduct.put("/:id", (req, res) => {
  // const product = productos[req.body.id - 1];

  // if(productos.indexOf(product) === -1) {
  //   res.json(msg)
  // } else {

  // }

  const product = productos[req.params.id - 1];

  if (productos.indexOf(product) === -1) {
    res.json(msg);
  } else {
    product.title = req.body.title;
    product.price = req.body.price;
    product.thumbnail = req.body.thumbnail;

    res.json(product);
  }
});

// Elimina un producto segun su id

routerProduct.delete("/:id", (req, res) => {
  // productos.splice(req.body.id - 1, 1);
  // res.json(productos);
  productos.splice(req.params.id - 1, 1);
  res.json(productos);
});

// --------------------------------------------------------------------------------------------------------

app.use("/api/productos", routerProduct);

app
  .listen(8080, () => {
    console.log("Server running");
  })
  .on("error", () => {
    console.log("Ha ocurrido un error");
  });
