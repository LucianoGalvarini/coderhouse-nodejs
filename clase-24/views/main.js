const socket = io.connect();

// ------------------------- Muestra mensajes -------------------------

function renderMsg(data, result) {
  const authorSchema = new normalizr.schema.Entity("author");
  const msgSchema = new normalizr.schema.Entity(
    "messages",
    {
      author: authorSchema,
    },
    { idAttribute: "id" }
  );

  const denormalizeData = normalizr.denormalize(
    data.result,
    [msgSchema],
    data.entities
  );

  const html = denormalizeData
    .map((msg) => {
      return `
          <div class="mensaje">
            <strong >${msg.author.id}</strong>
            <p>[${msg.date}]: </p>
            <em>${msg.text}</em>
            <img
              src="${msg.author.avatar}"
              style="width: 30px; height: 30px; margin-left: 10px;"
            />
          </div>
          `;
    })
    .join(" ");
  document.getElementById("messages").innerHTML = html;

  let centerMsg;

  if (result > 0) {
    centerMsg = Math.round(result);
  } else {
    centerMsg = 0;
  }

  document.getElementById(
    "centroMsg"
  ).innerHTML = `Centro de mensajes - (Compresión: %${centerMsg})`;
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

  const product = productos
    .map((producto) => {
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
    })
    .join(" ");

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

socket.on("messages", (data, result) => renderMsg(data, result));
socket.on("productos", (productos) => renderProductList(productos));

// ------------------------- Formulario de  mensajes -------------------------

function addMessage() {
  const inputEmail = document.getElementById("email");
  const inputNombre = document.getElementById("nombre");
  const inputApellido = document.getElementById("apellido");
  const inputEdad = document.getElementById("edad");
  const inputAlias = document.getElementById("alias");
  const inputAvatar = document.getElementById("avatar");
  const inputText = document.getElementById("texto");

  if (
    inputEmail.value &&
    inputNombre.value &&
    inputApellido.value &&
    inputEdad.value &&
    inputAlias.value &&
    inputAvatar.value &&
    inputText.value
  ) {
    const mensaje = {
      author: {
        id: inputEmail.value,
        nombre: inputNombre.value,
        apellido: inputApellido.value,
        edad: inputEdad.value,
        alias: inputAlias.value,
        avatar: inputAvatar.value,
      },
      text: inputText.value,
    };

    socket.emit("newMessage", mensaje);
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

// function setCookie(cname, cvalue, exminutes) {
//   var d = new Date();
//   d.setTime(d.getTime() + exminutes * 60 * 1000);
//   var expires = "expires=" + d.toUTCString();
//   document.cookie =
//     cname + "=" + cvalue + "; SameSite=None; Secure; " + expires + ";path=/";
// }

// function createUser() {
//   const loginUser = document.getElementById("loginUser");
//   setCookie("login", loginUser.value, 10);
// }