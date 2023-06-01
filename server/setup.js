//@ts-check
const { faker } = require("@faker-js/faker");
const { writeFile } = require("fs");

let products = [];
for (let i = 0; i < 10; i++) {
    const optionNames = ['size', 'color'];
    const optionValues = [['m', 'l', 'xl', 'xxl', 'xxxl'], [faker.internet.color(), faker.internet.color(), faker.internet.color(), faker.internet.color()]];
    
    const categories = ["Accessories", "Apparel", "Shoes", "Jacket", "TShirts", "Watch", "Pants"];

    const randomOptionIndex = Math.floor(Math.random() * optionNames.length);
    const randomCategoryIndex = Math.floor(Math.random() * categories.length);

    const product = {
        title: faker.commerce.productName(),
        desc: faker.commerce.productDescription(),
        vendor: faker.company.name(),
        category: categories[randomCategoryIndex],
        price: parseFloat(faker.commerce.price()),
        quantity: faker.number.int({min: 0, max: 100}),
        unit: 'pcs',
        published: faker.datatype.boolean(),
        discount: faker.number.int({ min: 0, max: 30 }),
        rating: faker.number.int({ min: 0, max: 5 }),
        ratingCount: faker.number.int({ min: 0, max: 50 }),
        imageSrc: [faker.image.urlLoremFlickr({ category: categories[randomCategoryIndex], width: 420, height: 600 })],
        requireShipping: faker.datatype.boolean(),
        options: [
            {
                name: optionNames[randomOptionIndex],
                value: optionValues[randomOptionIndex]
            }
        ],
        tags: [faker.commerce.productAdjective(), faker.commerce.productAdjective(), faker.commerce.productAdjective()]
    };
    products.push(product);
}

writeFile('product_data.json', JSON.stringify(products), (err) => {
    if (err) {
        console.log(err.message);
        return;
    }
    console.log("File saved");
})