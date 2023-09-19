const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Post = require('../models/post')
const User = require('../models/user')

describe('existing posts', () => {
  let user
  let testUser
  let token
  beforeAll(async () => {
    testUser = new User({
      username: 'Admin',
      name: 'Discord',
      passwordHash: await bcrypt.hash('sussybaka', 10),
    })
    user = await testUser.save()
    user.toJSON()
    token = jwt.sign({ username: testUser.username, id: testUser._id }, process.env.SECRET)
  })
  beforeEach(async () => {
    await Post.deleteMany()
    await Post.insertMany(helper.initialPosts)
    await Post.findOneAndUpdate({ title: 'Amogus' }, { user: testUser._id }, { new: true } )
  })

  test('posts returned as JSON',  async () => {
    await api
      .get('/api/posts')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all notes are returned', async () => {
    const res = await api.get('/api/posts')
    expect(res.body).toHaveLength(helper.initialPosts.length)
  })

  test('id property name', async () => {
    const res = await api.get('/api/posts')
    for (let post of res.body) {
      expect(post.id).toBeDefined()
    }
  })

  test('create new blog post', async () => {
    const newPost = {
      title: 'Spongebob',
      author: 'Mr. Krabs',
      url: 'www.google.com',
      likes: 420
    }

    await api.post('/api/posts')
      .send(newPost)
      .set({ Authorization : `bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const postsAtEnd = await helper.postsInDb()

    expect(postsAtEnd).toHaveLength(helper.initialPosts.length + 1)

    const titles = postsAtEnd.map(p => p.title)
    expect(titles).toContain(
      'Spongebob'
    )
  })

  test('missing token create new blog', async () => {
    const newPost = {
      title: 'Spongebob',
      author: 'Mr. Krabs',
      url: 'www.google.com',
      likes: 420
    }

    await api.post('/api/posts')
      .send(newPost)
      .expect(401)
  })

  test('likes missing from POST request', async () => {
    const newPost = {
      title: 'Testing',
      author: 'Hello',
      url: 'www.yahoo.com',
    }

    const res = await api.post('/api/posts')
      .send(newPost)
      .set({ Authorization : `bearer ${token}` })
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(res.body.likes).toBe(0)
  })

  test('missing title or url', async () => {
    const missingTitle = {
      author: 'Yahoo',
      url: 'www.google.com',
      likes: 123,
    }
    const missingUrl = {
      title: 'Frontlines',
      author: 'me',
      likes: 230
    }

    await api.post('/api/posts')
      .send(missingTitle)
      .set({ Authorization : `bearer ${token}` })
      .expect(400)

    await api.post('/api/posts')
      .send(missingUrl)
      .set({ Authorization : `bearer ${token}` })
      .expect(400)
  })

  test('delete invalid id', async () => {
    const id = Math.floor(Math.random() * 100)
    await api.delete(`/api/posts/${id}`)
      .set({ Authorization : `bearer ${token}` })
      .expect(400)
  })

  test('delete posts with valid id', async () => {
    const postsAtStart = await helper.postsInDb()
    const postToDelete = postsAtStart[0]

    await api.delete(`/api/posts/${postToDelete.id}`)
      .set({ Authorization : `bearer ${token}` })
      .expect(204)

    const notesAtEnd = await helper.postsInDb()

    expect(notesAtEnd).toHaveLength(helper.initialPosts.length - 1)

    const titles = notesAtEnd.map(p => p.title)
    expect(titles).not.toContain(postToDelete.title)
  })

  test('update post with valid id', async () => {
    const postsAtStart = await helper.postsInDb()
    const postToUpdate = postsAtStart[0]
    const newPost = { ...postToUpdate, likes: postToUpdate.likes + 1 }

    await api.put(`/api/posts/${newPost.id}`)
      .send(newPost)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const postsAtEnd = await helper.postsInDb()
    const updatedPost = postsAtEnd[0]
    expect(updatedPost.likes).toBe(postToUpdate.likes + 1)
  })

})

describe('one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('user with invalid password not created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'sussus',
      name: 'amogus',
      password: 'i'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('invalid password')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

  test('user with invalid username not created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 's',
      name: 'amogus',
      password: 'impostor'
    }

    const result = await api.post('/api/users').send(newUser).expect(400).expect('Content-Type', /application\/json/)
    console.log(result.body)
    expect(result.body.error).toContain('Username is less than 3 characters')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})


afterAll(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})



