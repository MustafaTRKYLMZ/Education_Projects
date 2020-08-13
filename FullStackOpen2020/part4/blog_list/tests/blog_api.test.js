const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogs = helper.Blogstest.map(blog => new Blog(blog))
  const promiseArray = blogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

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

test('a blog can be added', async () => {
  const newBlog = {
    title: 'Full Stack Open',
    author: 'Mustafa NNM',
    url: 'https://github.com/',
    likes: 1,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb).toHaveLength(helper.Blogstest.length + 1)

  const titles = blogsInDb.map(n => n.title)
  expect(titles).toContain(newBlog.title)

  const blogsInDbWithoutId = await helper.blogsInDbWithoutId()
  expect(blogsInDbWithoutId).toContainEqual(newBlog)
})

test('blog contains expected fields', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
  expect(response.body[0]._id).not.toBeDefined()
  expect(response.body[0].__v).not.toBeDefined()
})

test('empty like defaults to zero', async () => {
  const newBlog = {
    title: 'Default value in Mongoose',
    author: 'Mustafa NNM',
    url: 'https://google.com/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb).toHaveLength(helper.Blogstest.length + 1)

  expect(blogsInDb.filter(blog => blog.title === newBlog.title)).toHaveLength(1)

  const savedBlog = blogsInDb.find(blog => blog.title === newBlog.title)
  expect(savedBlog.likes).toBe(0)
})

const MissingProperty = async (newBlogWithMissingThings) => {
  await api
    .post('/api/blogs')
    .send(newBlogWithMissingThings)
    .expect(400)
    .expect('Content-Type', /application\/json/)

  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb).toHaveLength(helper.Blogstest.length)
}

test('empty title causes error', async () => {
  const newBlogWithoutTitle = {
    author: 'Mustafa',
    url: 'https://google.com/',
  }
  await MissingProperty(newBlogWithoutTitle)
})

test('empty url causes error', async () => {
  const newBlogWithoutUrl = {
    title: 'Test title',
    author: 'Mustafa',
  }

  await MissingProperty(newBlogWithoutUrl)
})

afterAll(() => {
  mongoose.connection.close()
})