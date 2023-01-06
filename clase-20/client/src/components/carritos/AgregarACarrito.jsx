import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useState } from "react";

const AgregarACarrito = (data) => {
  const cookies = new Cookies();

  async function handleSubmit() {
    await axios
      .post(
        `http://localhost:8080/api/carrito/${cookies.get("cart")}/productos`,
        {productId: data.data._id}
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("ok");
        }
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <button className="btn btn-warning" type="submit">
        <img
          src="https://cdn0.iconfinder.com/data/icons/iconoteka-stroke/24/iconoteka_shopping_cart_add_b_s-64.png"
          alt=""
        />
      </button>
    </form>
  );
};

export default AgregarACarrito;
