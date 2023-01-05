const faker = require("faker");

function generateProducts() {
  const products = [];
  for (let i = 0; i < 1; i++) {
    const product = {
      title: faker.commerce.productName(),
      price: faker.commerce.price(),
      thumbnail: faker.image.imageUrl(),
    };
    products.push(product);
  }
  return products;
}

module.exports = {
  generateProducts,
};
