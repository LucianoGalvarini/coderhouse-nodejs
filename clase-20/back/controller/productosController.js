const express = require("express");
const ProductosDaoMongoDB = require("../daos/ProductosDaoMongoDB");

class productosController {
  constructor() {
    this.productosRouter = express.Router();
    this.productosDaoMongoDB = new ProductosDaoMongoDB();

    this.productosRouter.get("/productos", (req, res) => {
      this.productosDaoMongoDB
        .getAll()
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.productosRouter.get("/productos/:id", (req, res) => {
      this.productosDaoMongoDB
        .getById(req.params.id)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.productosRouter.post("/productos", (req, res) => {
      this.productosDaoMongoDB
        .add(req.body)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.productosRouter.put("/productos/:id", (req, res) => {
      this.productosDaoMongoDB
        .update(req.params.id, req.body)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.productosRouter.delete("/productos/:id", (req, res) => {
      this.productosDaoMongoDB
        .delete(req.params.id)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });
  }

  getRouter() {
    return this.productosRouter;
  }
}

module.exports = productosController;
