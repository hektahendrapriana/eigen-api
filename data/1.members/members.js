const faker = require('faker')
const ObjectID = require('mongodb').ObjectID

module.exports = [
  {
    _id: new ObjectID('651bf3573dc51a979f9b6dac'),
    code: "M001",
    name: "Angga",
    status: "Active",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('651bf36c3dc51a979f9b6dae'),
    code: "M002",
    name: "Ferry",
    status: "Active",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  },
  {
    _id: new ObjectID('651bf3753dc51a979f9b6db0'),
    code: "M003",
    name: "Putri",
    status: "Active",
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent()
  }
]
