const contenedorMongoDB = require("../contenedores/ContenedorMongoDB");
const productoModel = require("../models/producto");

class ProductosDaoMongoDB extends contenedorMongoDB {
  constructor() {
    super(
      "mongodb+srv://luciano:ROdDQ84JNa69iirR@cluster0.w6djkta.mongodb.net/test",
      productoModel
    );
  }
}

module.exports = ProductosDaoMongoDB;
