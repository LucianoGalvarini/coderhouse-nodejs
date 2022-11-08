const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const fs = require("fs");
const { clearScreenDown } = require("readline");

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
  res.render("main");
});

// ------------------------- MENSAJES -------------------------

io.on("connection", async (socket) => {
  console.log("Un cliente se ha conectado");
  if (!fs.existsSync("messages.json")) {
    await fs.promises.writeFile("messages.json", JSON.stringify([], null, 2));
  }

  let msgs = await fs.promises.readFile("messages.json");

  socket.emit("messages", JSON.parse(msgs));
  socket.emit("productos", productos);

  socket.on("new-message", (data) => {
    let result = JSON.parse(msgs);
    io.emit("messages", result);

    let newMsg = {
      fecha: new Date().toLocaleString(),
      ...data,
    };
    result.push(newMsg);

    fs.promises.writeFile("messages.json", JSON.stringify(result, null, 2));
  });

  socket.on("newProduct", (product) => {
    productos.push(product);
    io.emit("productos", productos);clearScreenDown
  });
});

// ------------------------------------------------------------

httpServer.listen(8080, function () {
  console.log("Servidor corriendo");
});