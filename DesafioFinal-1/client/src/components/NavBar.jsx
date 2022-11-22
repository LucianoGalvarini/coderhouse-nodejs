import React from "react";
import "./styles/style.css";

const NavBar = () => {
  return (
    <header className="header" id="inicio">
      <div className="contenedor">
        <h4 className="titulo">Desafio Final</h4>
      </div>
      <nav className="menu-navegacion">
        <a href="http://localhost:3000/">Productos</a>
        <a href="/form">Formulario</a>
      </nav>
    </header>
  );
};

export default NavBar;
