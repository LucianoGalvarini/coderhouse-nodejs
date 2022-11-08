const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const handlebarsConfig = {
  defaultLayout: "index.handlebars",
};

app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", exphbs(handlebarsConfig));
app.set("view engine", "handlebars");
app.set("views", "../views");
app.use(express.static("../views"));

// ------------------------------------------------------------

let productos = [];
let messages = [];

app.get("/", (req, res) => {
  res.render("main");
});

// ------------------------- MENSAJES -------------------------

io.on("connection", (socket) => {
  console.log("un cliente se ha conectado");

  // const isStock = productos.length > 0 ? true : false;
  socket.emit("messages", messages);
  socket.emit("productos", productos);

  socket.on("new-message", (data) => {
    console.log((data.fecha = new Date().toLocaleString()));
    messages.push(data);
    io.emit("messages", messages);
  });

  socket.on("newProduct", (product) => {
    productos.push(product);
    io.emit("productos", productos);
  });
});

// ------------------------------------------------------------

httpServer.listen(8080, function () {
  console.log("Servidor corriendo");
});

// app.post("/", (req, res) => {
//   if (req.body.title && req.body.price && req.body.thumbnail) {
//     productos.push(req.body);
//     res.redirect("/");
//   } else {
//     console.log("Debe llenar todos los campos para cargar un producto");
//   }
// });

// app.get("/", (req, res) => {
//   res.render("formulario");
// });

// app.get("/productos", (req, res) => {
//   const isStock = productos.length > 0 ? true : false;
//   res.render("lista", { productos, isStock });
// });

// ------------------------------------------------------------

// app.listen(8080, () => {
//   console.log("Servidor ok, puerto 8080");
// });
