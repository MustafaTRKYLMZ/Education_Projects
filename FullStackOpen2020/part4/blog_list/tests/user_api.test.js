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

const testFail = async (user, errorExpected) => {
  const usersAtStart = await helper.usersInDb()

  const result = await api
    .post('/api/users')
    .send(user)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  expect(result.body.error).toContain(errorExpected)

  const usersAtEnd = await helper.usersInDb()
  expect(usersAtEnd).toHaveLength(usersAtStart.length)
}

describe('when there is initially one user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash(helper.existUser.password, 10)
    const user = new User({ username: helper.existUser.username, passwordHash: passwordHash })

    await user.save()
  })

  test('creation succeeds for a new username', async () => {
    const usersAtStart = await helper.usersInDb()

    await api
      .post('/api/users')
      .send(helper.Usertest)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(helper.Usertest.username)
  })

  test('creation fails with proper statuscode and message if username already exists', async () => {
    const newUser = {
      username: helper.existUser.username,
      name: 'Newuser',
      password: 'newuser',
    }
    await testFail(newUser, '`username` to be unique')
  })

  test('after creation, all users are retrieved properly', async () => {
    await api
      .post('/api/users')
      .send(helper.Usertest)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body.map((user => user.username))).toContainEqual(helper.existUser.username)
    expect(response.body.map((user => user.username))).toContainEqual(helper.Usertest.username)
  })

})

describe('when there is no user in db', () => {

  beforeEach(async () => {
    await User.deleteMany({})
  })

  test('creation fails with proper statuscode and message if username empty', async () => {
    const newUser = {
      name: 'Newuser',
      password: 'newuser',
    }
    await testFail(newUser, '`username` is required')
  })

  test('creation fails with proper statuscode and message if username is short', async () => {
    const newUser = {
      username: 'or',
      name: 'Newuser',
      password: 'newuser',
    }
    await testFail(newUser, '`username` (`or`) is shorter than the minimum allowed length (3)')
  })

  test('creation fails with proper statuscode and message if password empty', async () => {
    const newUser = {
      username: 'newuser',
      name: 'newuser',
    }
    await testFail(newUser, 'password missing')
  })

  test('creation fails with proper statuscode and message if password is short', async () => {
    const newUser = {
      username: 'newuser',
      name: 'Newuser',
      password: 'ne',
    }
    await testFail(newUser, 'password should be at least 3 characters long')
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})