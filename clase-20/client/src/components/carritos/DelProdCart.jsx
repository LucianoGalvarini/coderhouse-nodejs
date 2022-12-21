import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { Button } from "react-bootstrap";

const DelProdCart = (idProduct) => {
  const cookies = new Cookies();

  async function handleSubmit() {
    await axios.delete(
      `http://localhost:8080/api/carrito/${cookies.get("cart")}/productos/${
        idProduct.idProduct
      }`
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <Button variant="danger" type="submit">
        Eliminar
      </Button>
    </form>
  );
};

export default DelProdCart;
