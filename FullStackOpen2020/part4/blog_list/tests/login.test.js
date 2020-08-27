const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const helper = require('./test_helper')
const supertest = require('supertest')
const config = require('../utils/config')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeAll(async () => {
  await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
})

describe('when test user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})
//register page
    const passwordHash = await bcrypt.hash(helper.Usertest.password, 10)
    const user = new User({
      username: helper.Usertest.username,
      name: helper.Usertest.name,
      passwordHash: passwordHash
    })

    await user.save()
  })

  test('login succeeds with correct password', async () => {
    const credentials = {
      username: helper.Usertest.username,
      password: helper.Usertest.password
    }
    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.token).toBeDefined()
    expect(response.body.username).toBe(helper.Usertest.username)
    expect(response.body.name).toBe(helper.Usertest.name)
  })

  test('login fails with wrong password', async () => {
    const credentials = {
      username: helper.Usertest.username,
      password: 'paswordnotcorrect'
    }
    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('invalid username or password')
  })

  test('login fails with wrong user', async () => {
    const credentials = {
      username: 'usernotcorrect',
      password: 'paswordnotcorrect',
    }
    const response = await api
      .post('/api/login')
      .send(credentials)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('invalid username or password')
  })

})

afterAll(async () => {
  await mongoose.connection.close()})