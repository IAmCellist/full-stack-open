const postsRouter = require('express').Router()
const Post = require('../models/post')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

postsRouter.get('/', async(req, res) => {
  const posts = await Post.find({}).populate('user', { posts: 0 })
  res.json(posts)
})

postsRouter.post('/', userExtractor, async (req, res) => {
  console.log(req)
  const body = req.body

  const user = await User.findById(req.user.id)

  const post = new Post({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    id: body.id,
    user: user.id
  })

  await post.populate('user', { posts: 0 })

  const savedPost = await post.save()

  user.posts = user.posts.concat(savedPost._id)
  await user.save()

  res.status(201).json(savedPost)

})

postsRouter.delete('/:id', userExtractor, async (req, res) => {
  const post = await Post.findById(req.params.id)
  if (!post) {
    return res.status(404).json({ error : 'post not found' })
  }

  if (req.user.id === post.user.toString()) {
    await post.deleteOne()
    return res.status(204).end()
  }

  res.status(401).json({ error: 'invalid credentials' })

})

postsRouter.put('/:id', async (req, res) => {
  const post = req.body
  await Post.findByIdAndUpdate(req.params.id, post, { new: true })
  res.status(201).json(post)
})

module.exports = postsRouter