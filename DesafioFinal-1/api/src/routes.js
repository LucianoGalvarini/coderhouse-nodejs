import express from "express";
const { Router } = express;
const app = express();
const routerProduct = Router();
const routerCart = Router();
import cors from "cors";
import {
  actualizarProducto,
  borrarProducto,
  cargarProducto,
} from "./functions.js";
import { products } from "./files.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// ---------------------------------------------------- PRODUCTOS ----------------------------------------------------
// Me permite listar todos los productos disponibles o un producto por su id (U y A)
routerProduct.get("/:id?", (req, res) => {
  if (req.params.id) {
    res.json(products[req.params.id - 1]);
  } else {
    res.json(products);
  }
});

// Para incorporar productos al listado (A)
routerProduct.post("/", (req, res) => {
  res.json(cargarProducto(req.body));
});

// Actualiza un producto por su id (A)
routerProduct.put("/:id", (req, res) => {
  res.json(actualizarProducto(req.body, req.params.id));
});

// Borra un producto por su id (A)
routerProduct.delete("/:id", (req, res) => {
  res.json(borrarProducto(req.params.id));
});

// Ruta definida
app.use("/api/productos", routerProduct);

// ---------------------------------------------------- CARRITO ----------------------------------------------------
// Crea un carrito y devuelve su id (U y A)
routerCart.post("/", (req, res) => {});

// Vacia un carrito y lo elimina (U y A)
routerCart.delete("/:id", (req, res) => {});

// Me permite listar todos los productos guardados en el carrito (U y A)
routerCart.get("/:id/productos", (req, res) => {});

// Para incorporar productos al carrito por su id de producto (U y A)
routerCart.post("/:id/productos", (req, res) => {});

// Eliminar un producto del carrito por su id de carrito y de producto (U y A)
routerCart.delete("/:id/productos/:id_prod", (req, res) => {});

// Ruta definida
app.use("/api/carrito", routerCart);

// ---------------------------------------------------- SERVIDOR ----------------------------------------------------
app
  .listen(8080, () => {
    console.log("Servidor iniciado");
  })
  .on("error", () => {
    console.log("Ha ocurrido un error");
  });