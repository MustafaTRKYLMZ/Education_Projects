const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const helper = require('./test_helper')
const supertest = require('supertest')
const config = require('../utils/config')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

let testUserId

const loginWithTestUser = async () => {
  const credentials = {
    username: helper.Usertest.username,
    password: helper.Usertest.password
  }
  const response = await api
    .post('/api/login')
    .send(credentials)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return response.body.token
}

beforeAll(async () => {
  await mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash(helper.Usertest.password, 10)
  let user = new User({
    username: helper.Usertest.username,
    name: helper.Usertest.name,
    passwordHash: passwordHash
  })

  user = await user.save()

  for (let blog of helper.Blogstest) {
    let newBlog = new Blog(blog)
    newBlog.user = user.toJSON().id.toString()
    newBlog = await newBlog.save()
    user.blogs.push(newBlog.toJSON().id.toString())
  }
  user = await user.save()
  testUserId = user.toJSON().id
}, 10000)

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('no of initial blogs are OK', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.Blogstest.length)
  })

  test('title of initial blogs are as expected', async () => {
    const response = await api.get('/api/blogs')
    const titles = response.body.map(b => b.title)
    const expectedTitles = helper.Blogstest.map(b => b.title)
    expectedTitles.forEach((title) => {
      expect(titles).toContainEqual(title)
    })
    // Can also compare the while array
    expect(titles).toEqual(expectedTitles)
  })

  test('blog contains expected fields', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).not.toBeDefined()
    expect(response.body[0].__v).not.toBeDefined()
  })
})

describe('addition of a new blog', () => {

  test('a blog can be added', async () => {
    let myToken = await loginWithTestUser()

    const newBlog = {
      title: 'Fullxx',
      author: 'Mustafa',
      url: 'https://github.com/',
      likes: 4,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${myToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.Blogstest.length + 1)

    const titles = blogsInDb.map(n => n.title)
    expect(titles).toContain(newBlog.title)

    const blogsInDbWithoutId = await helper.blogsInDbWithoutId()
    expect(blogsInDbWithoutId).toContainEqual({ ...newBlog, user: testUserId })
  })

  test('a blog cannot be added if not logged in', async () => {
    const newBlog = {
      title: 'Fullxxx',
      author: 'Mustafa',
      url: 'https://github.com/',
      likes: 4,
    }

    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('invalid token')
  })

  test('empty like defaults to zero', async () => {
    let myToken = await loginWithTestUser()

    const newBlog = {
      title: 'Random value',
      author: 'Mustafa',
      url: 'https://github.com/',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${myToken}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.Blogstest.length + 1)

    expect(blogsInDb.filter(blog => blog.title === newBlog.title)).toHaveLength(1)

    const savedBlog = blogsInDb.find(blog => blog.title === newBlog.title)
    expect(savedBlog.likes).toBe(0)
  })

  const Property = async (newBlogWithMissingField) => {
    let myToken = await loginWithTestUser()

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${myToken}`)
      .send(newBlogWithMissingField)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.Blogstest.length)
  }

  test('empty title causes error', async () => {
    const newBlogWithoutTitle = {
      author: 'Mustafa',
      url: 'https://github.com/',
    }
    await Property(newBlogWithoutTitle)
  })

  test('empty url causes error', async () => {
    const newBlogWithoutUrl = {
      title: 'Test title',
      author: 'Mustafa',
    }
    await Property(newBlogWithoutUrl)
  })
})

describe('deletion of a new blog', () => {
  test('Blog with given id deleted', async () => {
    let myToken = await loginWithTestUser()

    await api
      .delete(`/api/blogs/${helper.Blogstest[0]._id}`)
      .set('Authorization', `bearer ${myToken}`)
      .expect(204)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.Blogstest.length - 1)

    const titles = blogsInDb.map(n => n.title)
    expect(titles).not.toContain(helper.Blogstest[0].title)

    const users = await helper.usersInDb()
    const testUser = users.find(u => u.username === helper.Usertest.username)
    expect(testUser.blogs.map(id => id.toString())).not.toContain(helper.Blogstest[0]._id)
  })

  test('Blog cannot be deleted if not logged in', async () => {
    const response = await api
      .delete(`/api/blogs/${helper.Blogstest[0]._id}`)
      .expect(401)

    expect(response.body.error).toBe('invalid token')
  })

})

describe('update of blog', () => {
  test('Blog can be updated', async () => {
    let myToken = await loginWithTestUser()

    const updatedBlog = { ...helper.Blogstest[0] }
    delete updatedBlog._id
    delete updatedBlog.__v
    updatedBlog.likes = 3001

    await api
      .put(`/api/blogs/${helper.Blogstest[0]._id}`)
      .send(updatedBlog)
      .set('Authorization', `bearer ${myToken}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsInDb = await helper.blogsInDb()
    expect(blogsInDb).toHaveLength(helper.Blogstest.length)

    const updatedBlogInDb = blogsInDb.find(blog => blog.id === helper.Blogstest[0]._id)
    expect(updatedBlogInDb.likes).toBe(3001)
  })

})

afterAll(async () => {
  await mongoose.connection.close()
})