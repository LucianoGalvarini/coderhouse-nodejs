const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const fs = require("fs");

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

app.get("/", (req, res) => {
  res.render("main.handlebars");
});

// ------------------------- MENSAJES -------------------------

if (!fs.existsSync("messages.json")) {
  fs.writeFileSync("messages.json", JSON.stringify([]));
}

let result = JSON.parse(fs.readFileSync("messages.json"));

io.on("connection", (socket) => {
  console.log("El usuario", socket.id, "se ha conectado");

  socket.on("disconnect", () => {
    console.log("El usuario", socket.id, "se ha desconectado");
  });

  socket.emit("messages", result);
  socket.emit("productos", productos);

  socket.on("newMessage", (data) => {
    let newMsg = {
      ...data,
      fecha: new Date().toLocaleString(),
    };
    result.push(newMsg);

    fs.writeFileSync("messages.json", JSON.stringify(result, null, 2));
    io.emit("messages", result);
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
