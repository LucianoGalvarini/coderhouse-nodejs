import express from "express";
const app = express();
const PORT = 8080;

let personas = [];

app.use(express.urlencoded({ extended: true }));

app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("formulario", { personas });
});

app.post("/datos", (req, res) => {
  personas.push(req.body);
  res.redirect("/");
});

const server = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`));
