import React from "react";
import "./styles/style.css";

const NavBar = () => {
  return (
    <header className="header" id="inicio">
      <div className="contenedor">
        <h4 className="titulo">
          <a href="/">Ecommerce</a>
        </h4>
      </div>
      <nav className="menu-navegacion">
        <a href="/">Inicio</a>
        <a href="/productos">Productos</a>
        <a href="/form">Formulario</a>
      </nav>
    </header>
  );
};

export default NavBar;
