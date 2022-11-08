const { debug } = require("console");
const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static("./public"));

let messages = [
  { author: "Juan", text: "Hola, soy Juan" },
  { author: "Pedro", text: "Hola, soy Pedro" },
  { author: "Ana", text: "Hola, soy Ana" },
];

io.on("connection", (socket) => {
  console.log("un cliente se ha conectado");
  socket.emit("messages", messages);

  socket.on("new-message", (data) => {
    messages.push(data);
    io.emit("messages", messages);
  });
});

httpServer.listen(8080, function () {
  console.log("Servidor corriendo");
});
