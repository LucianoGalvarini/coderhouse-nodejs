import React, { useState } from "react";
import "./styles/style.css";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Inicio = () => {
  const navigate = useNavigate();
  const [admin, setAdmin] = useState();

  const cookies = new Cookies();
  const handleA = () => setAdmin(1);
  const handleNA = () => setAdmin(0);

  cookies.set("admin", admin);

  async function handleSubmit(e) {
    e.preventDefault();

    await axios.post(`http://localhost:8080/api/carrito`).then((response) => {
      if (response.status === 200) {
        navigate("/productos");
        cookies.set("cart", response.data);
      }
    });
  }

  return (
    <form className="inicio" onSubmit={handleSubmit}>
      <button onClick={handleA} type="submit">
        Administrador
      </button>
      <button onClick={handleNA} type="submit">
        Usuario
      </button>
    </form>
  );
};

export default Inicio;
