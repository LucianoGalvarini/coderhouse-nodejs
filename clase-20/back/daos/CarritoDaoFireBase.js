const contenedorFireBase = require("../contenedores/ContenedorFirebase");
const ProductosDaoMongoDB = require("../daos/ProductosDaoMongoDB");

class CarritoDaoFireBase extends contenedorFireBase {
  constructor() {
    super("carritos");
  }

  async getAll() {
    const querySnapshot = await this.query.get();
    let docs = querySnapshot.docs;
    const response = docs.map((doc) => ({
      id: doc.id,
      nombre: doc.data().nombre,
      timestamp: doc.data().timestamp,
      products: doc.data().products,
    }));

    return response;
  }

  async addProduct(id, product) {
    const contenedorMongoDBasd = new ProductosDaoMongoDB();
    let productMongoDB = await contenedorMongoDBasd.getById(product.productId);

    let productAdd = {
      _id: product.productId,
      nombre: productMongoDB.nombre,
      descripcion: productMongoDB.descripcion,
      codigo: productMongoDB.codigo,
      thumbnail: productMongoDB.thumbnail,
      precio: productMongoDB.precio,
      stock: productMongoDB.stock,
    };

    let doc = this.query.doc(`${id}`);
    const item = await doc.get();
    let cpItem = { ...item.data() };

    cpItem.products.push(productAdd);
    console.log(productAdd);

    await doc.update(cpItem);
  }

  async deleteProduct(carritoId, productoId) {
    let doc = this.query.doc(`${carritoId}`);
    const item = await doc.get();
    let cpItem = { ...item.data() };
    cpItem.products = cpItem.products.filter((prd) => prd._id !== productoId);
    await doc.update(cpItem);
  }
}

module.exports = CarritoDaoFireBase;
