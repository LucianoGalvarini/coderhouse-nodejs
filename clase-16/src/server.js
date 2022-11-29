const express = require("express");
const exphbs = require("express-handlebars");
const app = express();
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

const { optionsSQLite } = require("../tables/optionsSQLite");
const knexSQLite3 = require("knex")(optionsSQLite);

const { options } = require("../tables/optionsMariaDB");
const knexMariaDB = require("knex")(options);

const handlebarsConfig = {
  defaultLayout: "index.handlebars",
};

app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", exphbs.engine(handlebarsConfig));
app.set("view engine", "handlebars");
app.set("views", "../views");
app.use(express.static("../views"));

// ------------------------------------------------------------

app.get("/", (req, res) => {
  res.render("main.handlebars");
});

// ------------------------- MENSAJES -------------------------

io.on("connection", (socket) => {
  console.log("El usuario", socket.id, "se ha conectado");

  socket.on("disconnect", () => {
    console.log("El usuario", socket.id, "se ha desconectado");
  });

  knexSQLite3
    .from("msg")
    .select("*")
    .then((data) => socket.emit("messages", data));

  knexMariaDB
    .from("product")
    .select("*")
    .then((data) => socket.emit("productos", data));

  socket.on("newMessage", (data) => {
    let newMsg = {
      ...data,
      date: new Date().toLocaleString(),
    };

    knexSQLite3("msg")
      .insert(newMsg)
      .then(() => console.log("msg inserted"))
      .catch((err) => {
        console.log(err);
        throw err;
      });

    knexSQLite3
      .from("msg")
      .select("*")
      .then((data) => socket.emit("messages", data));
  });

  socket.on("newProduct", (product) => {
    knexMariaDB("product")
      .insert(product)
      .then(() => console.log("product inserted"))
      .catch((err) => {
        console.log(err);
        throw err;
      });

    knexMariaDB
      .from("product")
      .select("*")
      .then((data) => socket.emit("productos", data));
  });
});

// ------------------------------------------------------------

httpServer.listen(8080, function () {
  console.log("Servidor corriendo");
});
