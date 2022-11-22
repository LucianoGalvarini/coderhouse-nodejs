import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

const BorrarCarrito = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    await axios
      .delete(`http://localhost:8080/api/carrito/${cookies.get("cart")}`)
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
        }
      });
  }

  return (
    <form onSubmit={handleSubmit} className="borrarCarrito">
      <h6>Eliminar carrito</h6>
      <button className="btn btn-danger" type="submit">
        <img
          src="https://cdn0.iconfinder.com/data/icons/iconoteka-stroke/24/iconoteka_shopping_cart__grocery_store_b_s-256.png"
          alt=""
        />
      </button>
    </form>
  );
};

export default BorrarCarrito;
