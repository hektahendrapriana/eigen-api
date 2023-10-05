/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const City = require('../app/models/book')
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')

const should = chai.should()
const loginDetails = {
  email: 'admin@admin.com',
  password: '12345'
}
let token = ''
const createdID = []
const title = faker.random.words()
const newTitle = faker.random.words()
const repeatedTitle = faker.random.words()

chai.use(chaiHttp)

describe('*********** BOOK ***********', () => {
  describe('/GET books', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/books')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET the books with filters', (done) => {
      chai
        .request(server)
        .get('/books?filter=Harry&fields=title')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          res.body.docs.should.have.lengthOf(1)
          res.body.docs[0].should.have.property('title').eql('Harry')
          done()
        })
    })
  })

  describe('/POST book', () => {
    it('it should NOT POST a book without name', (done) => {
      const book = {}
      chai
        .request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a book ', (done) => {
      const book = {
        code, title, author, stock
      }
      chai
        .request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'code', 'title', 'author', 'stock')
          createdID.push(res.body._id)
          done()
        })
    })
    it('it should NOT POST a book that already exists', (done) => {
      const book = {
        code, title, author, stock
      }
      chai
        .request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
  })

  describe('/GET/:id book', () => {
    it('it should GET a book by the given id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .get(`/books/${id}`)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('code')
          res.body.should.have.property('title')
          res.body.should.have.property('stock')
          res.body.should.have.property('author')
          res.body.should.have.property('_id').eql(id)
          done()
        })
    })
  })

  describe('/PATCH/:id book', () => {
    it('it should UPDATE a book given the id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .patch(`/books/${id}`)
        .send({
          title: newTitle
        })
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(id)
          res.body.should.have.property('title').eql(newTitle)
          done()
        })
    })
    it('it should NOT UPDATE a book that already exists', (done) => {
      const book = {
        title: repeatedTitle
      }
      chai
        .request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'code', 'title', 'author', 'stock')
          res.body.should.have.property('title').eql(repeatedTitle)
          createdID.push(res.body._id)
          const anotherTitle = {
            title: newTitle
          }
          chai
            .request(server)
            .patch(`/books/${createdID.slice(-1).pop()}`)
            .send(anotherTitle)
            .end((error, result) => {
              result.should.have.status(422)
              result.body.should.be.a('object')
              result.body.should.have.property('errors')
              done()
            })
        })
    })
  })

  describe('/DELETE/:id book', () => {
    it('it should DELETE a book given the id', (done) => {
      const book = {
        code, title, author, stock
      }
      chai
        .request(server)
        .post('/books')
        .send(book)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'code', 'title', 'author', 'stock')
          res.body.should.have.property('title').eql(title)
          chai
            .request(server)
            .delete(`/books/${res.body._id}`)
            .end((error, result) => {
              result.should.have.status(200)
              result.body.should.be.a('object')
              result.body.should.have.property('msg').eql('DELETED')
              done()
            })
        })
    })
  })

  after(() => {
    createdID.forEach((id) => {
      City.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
