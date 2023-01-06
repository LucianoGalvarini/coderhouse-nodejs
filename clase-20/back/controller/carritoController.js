const express = require("express");
const CarritoDaoFireBase = require("../daos/CarritoDaoFireBase");

class carritoController {
  constructor() {
    this.carritoRouter = express.Router();
    this.carritoDaoFireBase = new CarritoDaoFireBase();

    this.carritoRouter.get("/carrito", (req, res) => {
      this.carritoDaoFireBase
        .getAll()
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.carritoRouter.get("/carrito/:id", async (req, res) => {
      await this.carritoDaoFireBase
        .getById(req.params.id)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.carritoRouter.post("/carrito", (req, res) => {
      let carrito = {
        timestamp: new Date().toLocaleString(),
        products: [],
      };

      this.carritoDaoFireBase
        .add(carrito)
        .then((result) => res.json(carrito.id))
        .catch((error) => res.json(error));
    });

    // Agregar productos al carrito
    this.carritoRouter.post("/carrito/:id/productos", (req, res) => {
      
      // restar de stock

      this.carritoDaoFireBase
        .addProduct(req.params.id, req.body)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.carritoRouter.put("/carrito/:id", (req, res) => {
      this.carritoDaoFireBase
        .update(req.params.id, req.body)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.carritoRouter.delete("/carrito/:id", (req, res) => {
      this.carritoDaoFireBase
        .delete(req.params.id)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });

    this.carritoRouter.delete("/carrito/:id/productos/:id_prod", (req, res) => {
      this.carritoDaoFireBase
        .deleteProduct(req.params.id, req.params.id_prod)
        .then((result) => res.json(result))
        .catch((error) => res.json(error));
    });
  }

  getRouter() {
    return this.carritoRouter;
  }
}

module.exports = carritoController;
