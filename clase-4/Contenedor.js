const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.filename = archivo;
  }

  save = async (producto) => {
    try {
      if (fs.existsSync(this.filename)) {
        let result = await this.getAll();
        let lastId = result.reduce(
          (acc, item) => (item.id > acc ? (acc = item.id) : acc),
          0
        );
        let newProduct = {
          id: lastId + 1,
          ...producto,
        };
        result.push(newProduct);

        await fs.promises.writeFile(
          this.filename,
          JSON.stringify(result, null, 2)
        );
        return lastId + 1;
      } else {
        let newProduct = {
          id: 1,
          ...producto,
        };
        await fs.promises.writeFile(
          this.filename,
          JSON.stringify([newProduct], null, 2)
        );
        return 1;
      }
    } catch (error) {
      console.log(error);
    }
  };
  getAll = async () => {
    try {
      if (fs.existsSync(this.filename)) {
        let result = await fs.promises.readFile(this.filename);
        return JSON.parse(result);
      } else {
        throw "No se encontro el archivo";
      }
    } catch (error) {
      console.log(error);
    }
  };

  getById = async (itemId) => {
    try {
      if (fs.existsSync(this.filename)) {
        let result = await this.getAll();
        return result[itemId - 1] ? console.log(result[itemId - 1]) : null;
      } else {
        throw "No se encontro el archivo";
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteById = async (itemId) => {
    try {
      if (fs.existsSync(this.filename)) {
        let result = await this.getAll();
        let res = result.map((product) => product.id);

        if (res.includes(itemId)) {
          result.splice(itemId - 1, 1);
          fs.promises.writeFile(this.filename, JSON.stringify(result, null, 2));
          console.log(
            `El producto con el id ${itemId} fue eliminado con exito`
          );
        } else {
          console.log(
            `El archivo no contiene ningun producto con el id ${itemId}`
          );
        }
      } else {
        throw "No se encontro el archivo";
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteAll = async () => {
    try {
      if (fs.existsSync(this.filename)) {
        let result = await this.getAll();
        result.splice(0);

        await fs.promises.writeFile(
          this.filename,
          JSON.stringify(result, null, 2)
        );
        console.log(`Los productos fueron eliminados con exito`);
      } else {
        throw "No se encontro el archivo";
      }
    } catch (error) {
      console.log(error);
      
    }
  };
}

let contenedor = new Contenedor("productos.txt");

let producto = {
  title: "Coca Cola",
  price: 475,
  thumbnail:
    "https://carrefourar.vtexassets.com/arquivos/ids/220177/7790895000997_02.jpg?v=637704294205400000",
};
let producto2 = {
  title: "Fanta",
  price: 475,
  thumbnail:
    "https://carrefourar.vtexassets.com/arquivos/ids/220363-800-auto?v=637704294794530000&width=800&height=auto&aspect=true",
};
let producto3 = {
  title: "Sprite",
  price: 475,
  thumbnail:
    "https://carrefourar.vtexassets.com/arquivos/ids/254365-800-auto?v=637970558979700000&width=800&height=auto&aspect=true",
};

metodos = async () => {
  // save
  await contenedor.save(producto);
  await contenedor.save(producto2);
  await contenedor.save(producto3);

  // getById
  await contenedor.getById(2);

  // getAll
  console.log(await contenedor.getAll());

  // deleteById
  // await contenedor.deleteById(2);

  // deleteAll
  // await contenedor.deleteAll();
};

metodos();

