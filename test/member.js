/* eslint handle-callback-err: "off"*/

process.env.NODE_ENV = 'test'

const User = require('../app/models/member')
const faker = require('faker')
const chai = require('chai')
const chaiHttp = require('chai-http')
const server = require('../server')
// eslint-disable-next-line no-unused-vars
const should = chai.should()
const loginDetails = {
  admin: {
    id: '5aa1c2c35ef7a4e97b5e995a',
    email: 'admin@admin.com',
    password: '12345'
  },
  member: {
    id: '5aa1c2c35ef7a4e97b5e995b',
    email: 'user@user.com',
    password: '12345'
  }
}
const tokens = {
  admin: '',
  user: ''
}

const name = faker.random.words()
const newName = faker.random.words()
const repeatedName = faker.random.words()
const code = faker.random.words()
const createdID = []

chai.use(chaiHttp)

describe('*********** MEMBERS ***********', () => {
  describe('/GET members', () => {
    it('it should NOT be able to consume the route since no token was sent', (done) => {
      chai
        .request(server)
        .get('/members')
        .end((err, res) => {
          res.should.have.status(401)
          done()
        })
    })
    it('it should GET all the members', (done) => {
      chai
        .request(server)
        .get('/members')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          done()
        })
    })
    it('it should GET the members with filters', (done) => {
      chai
        .request(server)
        .get('/members?filter=angga&fields=name')
        .end((err, res) => {
          res.should.have.status(200)
          res.body.should.be.an('object')
          res.body.docs.should.be.a('array')
          res.body.docs.should.have.lengthOf(1)
          res.body.docs[0].should.have.property('name').eql('Angga')
          done()
        })
    })
  })
  describe('/POST member', () => {
    it('it should NOT POST a user without name', (done) => {
      const member = {}
      chai
        .request(server)
        .post('/members')
        .send(member)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should POST a member ', (done) => {
      const member = {
        name: faker.random.words(),
        code: faker.random.words()
      }
      chai
        .request(server)
        .post('/members')
        .send(member)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'code', 'name')
          createdID.push(res.body._id)
          done()
        })
    })
    it('it should NOT POST a member with code that already exists', (done) => {
      const member = {
        name: faker.random.words(),
        code: code
      }
      chai
        .request(server)
        .post('/members')
        .send(member)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should NOT POST a member with name that already exists', (done) => {
      const member = {
        name: name,
        code: faker.random.words()
      }
      chai
        .request(server)
        .post('/members')
        .send(member)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
  })
  describe('/GET/:id member', () => {
    it('it should GET a member by the given id', (done) => {
      const id = createdID.slice(-1).pop()
      chai
        .request(server)
        .get(`/members/${id}`)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('code')
          res.body.should.have.property('name')
          res.body.should.have.property('_id').eql(id)
          done()
        })
    })
  })
  describe('/PATCH/:id member', () => {
    it('it should UPDATE a member given the id', (done) => {
      const id = createdID.slice(-1).pop()
      const member = {
        code: 'M100',
        name: 'Boneng'
      }
      chai
        .request(server)
        .patch(`/members/${id}`)
        .send(member)
        .end((error, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          res.body.should.have.property('_id').eql(id)
          res.body.should.have.property('code').eql('Boneng')
          res.body.should.have
            .property('name')
            .eql('Boneng')
          createdID.push(res.body._id)
          done()
        })
    })
    it('it should NOT UPDATE a member with code that already exists', (done) => {
      const id = createdID.slice(-1).pop()
      const member = {
        code: 'M100',
        name: faker.random.words()
      }
      chai
        .request(server)
        .patch(`/members/${id}`)
        .send(member)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
    it('it should NOT UPDATE a member with name that already exists', (done) => {
      const id = createdID.slice(-1).pop()
      const member = {
        code: faker.random.words(),
        name: 'Boneng'
      }
      chai
        .request(server)
        .patch(`/members/${id}`)
        .send(member)
        .end((err, res) => {
          res.should.have.status(422)
          res.body.should.be.a('object')
          res.body.should.have.property('errors')
          done()
        })
    })
  })
  describe('/DELETE/:id member', () => {
    it('it should DELETE a member given the id', (done) => {
      const member = {
        code: 'M100',
        name: 'Boneng'
      }
      chai
        .request(server)
        .post('/members')
        .send(member)
        .end((err, res) => {
          res.should.have.status(201)
          res.body.should.be.a('object')
          res.body.should.include.keys('_id', 'code', 'name')
          chai
            .request(server)
            .delete(`/members/${res.body._id}`)
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
      User.findByIdAndRemove(id, (err) => {
        if (err) {
          console.log(err)
        }
      })
    })
  })
})
