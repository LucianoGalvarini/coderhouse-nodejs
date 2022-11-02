const express = require("express");
const exphbs = require("express-handlebars");
const app = express();

const handlebarsConfig = {
  defaultLayout: "index.handlebars",
};

app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", exphbs(handlebarsConfig));
app.set("view engine", "handlebars");
app.set("views", "../views");

// ------------------------------------------------------------

let productos = [];

app.post("/productos", (req, res) => {
  productos.push(req.body);
  res.redirect("/productos");
});

app.get("/productos", (req, res) => {
  const isStock = productos.length > 0 ? true : false;
  res.render("formulario");
  res.render("lista", { productos, isStock });
});

// ------------------------------------------------------------

app.listen(8080, () => {
  console.log("Servidor ok, puerto 8080");
});
