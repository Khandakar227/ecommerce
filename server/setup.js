//@ts-check
const { faker } = require("@faker-js/faker");
const { writeFile } = require("fs");

let products = [];
for (let i = 0; i < 10; i++) {
  const categories = [
    "Accessories",
    "Apparel",
    "Shoes",
    "Jacket",
    "TShirts",
    "Watch",
    "Pants",
  ];
  const randomCategoryIndex = Math.floor(Math.random() * categories.length);

  const available = faker.number.int({ min: 0, max: 100 });

  const product = {
    title: faker.commerce.productName(),
    desc: faker.commerce.productDescription(),
    vendor: faker.company.name(),
    category: categories[randomCategoryIndex],
    price: parseFloat(faker.commerce.price()),
    available,
    unit: "pcs",
    published: faker.datatype.boolean(),
    discount: faker.number.int({ min: 0, max: 30 }),
    imageSrc: [
      faker.image.urlLoremFlickr({ category: "cats", width: 400, height: 450 }),
    ],
    requireShipping: faker.datatype.boolean(),
    tags: [
      faker.commerce.productAdjective(),
      faker.commerce.productAdjective(),
      faker.commerce.productAdjective(),
    ],
  };
  products.push(product);
}

writeFile("product_data.json", JSON.stringify(products), (err) => {
  if (err) {
    console.log(err.message);
    return;
  }
  console.log("File saved");
});
