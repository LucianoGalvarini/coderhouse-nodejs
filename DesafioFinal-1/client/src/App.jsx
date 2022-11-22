import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import Productos from "./components/productos/Productos";
import NavBar from "./components/NavBar";
import Agregar from "./components/formularios/Agregar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/form" element={<Agregar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
