const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "pug");
app.set("views", "./views");

// ------------------------------------------------------------

let productos = [];

app.post("/productos/form", (req, res) => {
  productos.push(req.body);
  res.redirect("/productos/form");
});

app.get("/productos/form", (req, res) => {
  res.render("formulario.pug");
});

app.get("/productos/list", (req, res) => {
  const isStock = productos.length > 0 ? true : false;
  res.render("lista.pug", { productos, isStock });
});

// ------------------------------------------------------------

app.listen(8080, () => {
  console.log("Servidor ok, puerto 8080");
});
