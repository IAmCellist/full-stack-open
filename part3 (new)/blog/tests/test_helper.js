const Post = require('../models/post')
const User = require('../models/user')

const initialPosts = [
  {
    title: 'Amogus',
    author: 'The Impostor',
    url: 'www.google.com',
    likes: 20
  },
  {
    title: 'Sussus',
    author: 'Red',
    url: 'www.yahoo.com',
    likes: 10
  }
]

const nonExistingId = async () => {
  const post = new Post({
    title: 'Test',
    author: 'Me',
    url: 'www.youtube.com',
    likes: 0
  })
  await post.save()
  await post.deleteOne()
  return post._id.toString()
}

const postsInDb = async() => {
  const posts = await Post.find({})
  return posts.map(p => p.toJSON())
}

const usersInDb = async() => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialPosts, nonExistingId, postsInDb, usersInDb
}