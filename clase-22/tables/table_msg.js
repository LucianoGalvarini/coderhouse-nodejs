const { optionsSQLite } = require("./optionsSQLite");
const knex = require("knex")(optionsSQLite);

knex.schema
  .createTable("msg", (table) => {
    table.increments("id");
    table.string("author");
    table.string("date");
    table.string("text");
  })
  .then(() => console.log("tabla creada"))
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });
