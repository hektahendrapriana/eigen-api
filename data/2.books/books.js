const faker = require('faker')

const json = [
  {
    code: "JK-45",
    title: "Harry Potter",
    author: "J.K Rowling",
    stock: 1,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    code: "SHR-1",
    title: "A Study in Scarlet",
    author: "Arthur Conan Doyle",
    stock: 1,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    code: "TW-11",
    title: "Twilight",
    author: "Stephenie Meyer",
    stock: 1,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    code: "HOB-83",
    title: "The Hobbit, or There and Back Again",
    author: "J.R.R. Tolkien",
    stock: 1,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    code: "NRN-7",
    title: "The Lion, the Witch and the Wardrobe",
    author: "C.S. Lewis",
    stock: 1,
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]

module.exports = json
