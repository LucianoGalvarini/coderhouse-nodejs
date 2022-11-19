import express from "express";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
// const __dirname = dirname(fileURLToPath(import.meta.url));
const { Router } = express;
const app = express();
const routerProduct = Router();
const routerCart = Router();
import exphbs from "express-handlebars";
import { cargarProducto } from "./functions.js";
import { products } from "./files.js";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const handlebarsConfig = {
  defaultLayout: "index.handlebars",
};

app.engine("handlebars", exphbs.engine(handlebarsConfig));
app.set("view engine", "handlebars");
app.set("views", "../views");
app.use(express.static("../views"));

// ---------------------------------------------------- PRODUCTOS ----------------------------------------------------

app.get("/", (req, res) => {
  let isStock = products.length > 0 ? true : false;
  let admin = true;
  res.render("lista", { products, isStock, admin });
  // res.render("actualizar.handlebars");
});

app.get("/form", (req, res) => {
  res.render("formulario");
});

// Me permite listar todos los productos disponibles o un producto por su id (U y A)
routerProduct.get("/:id?", (req, res) => {
  if (req.params.id) {
    res.send(products[req.params.id - 1]);
  } else {
    res.send(products);
  }
});

// Para incorporar productos al listado (A)
routerProduct.post("/", (req, res) => {
  res.json(cargarProducto(req.body));
  res.render("formulario.handlebars");
});

// Actualiza un producto por su id (A)
routerProduct.put("/:id", (req, res) => {});

// Borra un producto por su id (A)
routerProduct.delete("/:id", (req, res) => {});

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
