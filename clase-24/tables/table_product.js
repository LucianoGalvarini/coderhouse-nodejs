const { options } = require("../options/config.js");
const knex = require("knex")(options);

knex.schema
  .createTable("product", (table) => {
    table.increments("id");
    table.string("title");
    table.integer("price");
    table.string("thumbnail");
  })
  .then(() => console.log("tabla creada"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });

  