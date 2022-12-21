import React from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

const Eliminar = (idProduct) => {
  async function handleSubmit() {
    await axios.delete(
      "http://localhost:8080/api/productos/" + idProduct.idProduct
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

export default Eliminar;
