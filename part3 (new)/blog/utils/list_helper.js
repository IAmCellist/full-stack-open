const dummy = (posts) => {
  console.log(posts)
  return 1
}

const totalLikes = (posts) => {
  return posts.reduce((sum, post) => {
    return sum + post.likes
  }, 0)
}

const favoritePost = (posts) => {
  const favPost = posts.reduce((topPost, currPost) => {
    return (topPost.likes > currPost.likes) ? topPost : currPost
  })

  delete favPost._id
  delete favPost.__v
  delete favPost.url

  return favPost
}

module.exports = {
  dummy,
  totalLikes,
  favoritePost
}