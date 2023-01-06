import React from "react";
import { Button, Col, Container, Modal, Row } from "react-bootstrap";
import BorrarCarrito from "./BorrarCarrito";
import DelProdCart from "./DelProdCart";

const ModalCart = (data, onHide) => {
  const carrito = data.data;
  return (
    <div>
      {carrito && (
        <Modal {...data} size={"xl"}>
          <Modal.Header closeButton>
            <Modal.Title
              style={{ width: "100%", textAlign: "center", padding: "0px" }}
            >
              Carrito
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className="show-grid">
            <Container>
              <Row className="modalProdList">
                {carrito.products.map((product) => (
                  <Col key={product._id} className="producto">
                    <div className="imagen">
                      <img src={product.thumbnail} />
                    </div>
                    <div className="informacion ">
                      <h4 className="nombre bordes">
                        <strong>{product.nombre}</strong>
                      </h4>
                      <p className="descripcion bordes">
                        {product.descripcion}
                      </p>
                      <p className="precio bordes">
                        <strong>${product.precio}</strong>
                      </p>
                      <h5 className="stock bordes">Stock: {product.stock}</h5>
                    </div>
                    <div className="">
                      <DelProdCart idProduct={product._id} />
                    </div>
                  </Col>
                ))}
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <BorrarCarrito />
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ModalCart;
