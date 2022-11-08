const socket = io.connect();

// ------------------------- Muestra mensajes -------------------------

function renderMsg(data) {
  const html = data
    .map((elem) => {
      return `
          <div class="mensaje">
            <strong >${elem.author}</strong>
            <p>[${elem.fecha}]</p>
            <em>: ${elem.text}</em>
          </div>
          `;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;
}

// ------------------------- Muestra lista de productos -------------------------

async function renderProductList(productos) {
  const stock = productos.length > 0;
  const table = `
    <table class="table">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Precio</th>
            <th scope="col">Foto</th>
          </tr>
        </thead>
        <tbody id="tableList">

        </tbody>
    </table>
  `;

  const product = productos.map((producto) => {
    return `
      <tr>
          <td>${producto.title}</td>
          <td>${producto.price}</td>
          <td>
            <img
              src="${producto.thumbnail}"
              style="width: 30px; height: 30px;"
            />
          </td>
      </tr>
      `;
  });

  if (stock) {
    document.getElementById("divTable").innerHTML = table;
    document.getElementById("tableList").innerHTML = product;
  } else {
    document.getElementById("divTable").innerHTML = `
      <div style="background-color: #f2eea2; padding: 10px; margin: 10px; border-radius: 10px;">
        <h3>No se encontraron productos</h3>
      </div>
      `;
  }
}

socket.on("messages", (data) => renderMsg(data));
socket.on("productos", (productos) => renderProductList(productos));

// ------------------------- Formulario de  mensajes -------------------------

function addMessage() {
  const inputEmail = document.getElementById("email");
  const inputTexto = document.getElementById("texto");

  if (inputEmail.value && inputTexto.value) {
    const mensaje = {
      author: inputEmail.value,
      text: inputTexto.value,
    };
    socket.emit("new-message", mensaje);
  } else {
    alert("Debe llenar todos los campos para cargar un producto");
  }
  return false;
}

// ------------------------- Formulario de  productos -------------------------

function addProduct() {
  const inputTitle = document.getElementById("inputTitle");
  const inputPrice = document.getElementById("inputPrice");
  const inputThumbnail = document.getElementById("inputThumbnail");

  if (inputTitle.value && inputPrice.value && inputThumbnail.value) {
    const product = {
      title: inputTitle.value,
      price: inputPrice.value,
      thumbnail: inputThumbnail.value,
    };
    socket.emit("newProduct", product);
  } else {
    alert("Debe llenar todos los campos para cargar un producto");
  }
  return false;
}
