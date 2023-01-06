import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";

const Actualizar = (producto) => {
  const [product, setProduct] = useState({
    nombre: "",
    descripcion: "",
    codigo: "",
    thumbnail: "",
    precio: "",
    stock: "",
  });

  async function handleSubmit() {
    if (
      !(product.nombre === "") &&
      !(product.descripcion === "") &&
      !(product.codigo === "") &&
      !(product.thumbnail === "") &&
      !(product.precio === "") &&
      !(product.stock === "")
    ) {
      await axios
        .put(
          "http://localhost:8080/api/productos/" + producto.producto._id,
          product
        )
        .then((response) => {
          if (response.status === 200) {
            console.log(product);
          }
        });
    }
  }

  function handleChange(e) {
    const { target } = e;
    const { name, value } = target;

    const newValues = {
      ...product,
      [name]: value,
    };
    setProduct(newValues);
  }

  useEffect(() => {
    setProduct(producto.producto);
  }, []);

  /* ------------------------------------------------- */

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Button
        variant="dark"
        type="submit"
        onClick={handleShow}
      >
        Actualizar
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Productos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="forms" onSubmit={handleSubmit}>
            <div>
              <label className="form-label">Nombre</label>
              <input
                type="text"
                className="form-control"
                name="nombre"
                defaultValue={product.nombre}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">Descripcion</label>
              <input
                type="text"
                className="form-control"
                name="descripcion"
                defaultValue={product.descripcion}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">Codigo</label>
              <input
                type="text"
                className="form-control"
                name="codigo"
                defaultValue={product.codigo}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">URL imagen</label>
              <input
                type="text"
                className="form-control"
                name="thumbnail"
                defaultValue={product.thumbnail}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                name="precio"
                defaultValue={product.precio}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                name="stock"
                defaultValue={product.stock}
                onChange={handleChange}
              />
            </div>
            <Button variant="success" type="submit" onClick={handleClose}>
              Guardar cambios
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Actualizar;
