const mongoose = require("mongoose");

class ContenedorMongoDB {
  constructor(connectionURI, model) {
    mongoose.set("strictQuery", false);
    mongoose.connect(
      connectionURI,
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err) => {
        if (err) {
          throw new Error(`Error en la conexión de la base de datos: ${err}`);
        }
      }
    );

    this.model = model;
  }

  async add(item) {
    let collection = await this.getAll();
    item.id = collection.length;
    const transactionObj = new this.model(item);
    let saveResponse = await transactionObj.save();
    return saveResponse;
  }

  async getAll() {
    let collection = await this.model.find({});
    return collection;
  }

  async getById(id) {
    let item = await this.model.findOne({ _id: id });
    return item;
  }

  async update(id, item) {
    let transactionObj = await this.model.findOneAndUpdate({ _id: id }, item);
    return transactionObj;
  }

  async delete(id) {
    let transactionObj = await this.model.deleteOne({ _id: id });
    return transactionObj;
  }
}

module.exports = ContenedorMongoDB;
