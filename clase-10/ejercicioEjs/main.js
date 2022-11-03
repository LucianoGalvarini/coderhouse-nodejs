const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");

// ------------------------------------------------------------

let productos = [];

app.post("/productos/form", (req, res) => {
  productos.push(req.body);
  res.redirect("/productos/form");
});

app.get("/productos/form", (req, res) => {
  res.render("formulario");
});

app.get("/productos/list", (req, res) => {
  res.render("lista", { productos });
});

// ------------------------------------------------------------

app.listen(8080, () => {
  console.log("Servidor ok, puerto 8080");
});
