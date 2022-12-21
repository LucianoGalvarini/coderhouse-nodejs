import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Productos from "./components/productos/Productos";
import NavBar from "./components/NavBar";
import Agregar from "./components/productos/Agregar";
import Inicio from "./components/Inicio";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/form" element={<Agregar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
