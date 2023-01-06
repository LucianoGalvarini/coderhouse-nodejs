import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/style.css";
import Actualizar from "./Actualizar";
import Eliminar from "./Eliminar";
import AgregarACarrito from "../carritos/AgregarACarrito";
import Cookies from "universal-cookie";
import Carrito from "../carritos/Carrito";

const Productos = () => {
  const [listProduct, setListProduct] = useState([]);
  const [cart, setCart] = useState();
  const cookies = new Cookies();
  const [admin, setAdmin] = useState([]);

  async function handleData() {
    await axios.get("http://localhost:8080/api/productos").then((response) => {
      if (response.status === 200) {
        setListProduct(response.data);
        setAdmin(cookies.get("admin"));
      }
    });
  }

  async function handleSubmit() {
    await axios
      .get(`http://localhost:8080/api/carrito/${cookies.get("cart")}`)
      .then((response) => {
        if (response.status === 200) {
          setCart(response.data);
        }
      });
  }

  useEffect(() => {
    handleSubmit();
    handleData();
  }, []);

  return (
    <div className="listaProductos">
      <Carrito data={cart} />
      {listProduct.length > 0 &&
        listProduct.map((product) => (
          <div key={product.id} className="producto">
            <div className="imagen">
              <img src={product.thumbnail} />
            </div>
            <div className="informacion">
              <h4 className="nombre bordes">
                <strong>{product.nombre}</strong>
              </h4>
              <p className="descripcion bordes">{product.descripcion}</p>
              <p className="precio bordes">
                <strong>${product.precio}</strong>
              </p>
              <h5 className="stock bordes">Stock: {product.stock}</h5>
            </div>

            <div className="btnFormulario">
              {admin > 0 && (
                <div className="btnFormulario-admin">
                  <Actualizar producto={product} />
                  <Eliminar idProduct={product._id} />
                </div>
              )}
              <AgregarACarrito data={product} />
            </div>
          </div>
        ))}
      {listProduct.length < 1 && (
        <div>
          <h2>No hay productos</h2>
        </div>
      )}
    </div>
  );
};

export default Productos;
