const PostForm = ({addPost, title, titleChange, author, authorChange, url, urlChange}) => {
  return <form onSubmit={addPost}>
    <div>
      title:
      <input
      type='text'
      value={title}
      name='Title'
      onChange={titleChange}/>
    </div>
    <div>
      author:
      <input
      type='text'
      value={author}
      name='author'
      onChange={authorChange}/>
    </div>
    <div>
      url:
      <input
      type='text'
      value={url}
      name='url'
      onChange={urlChange}/>
    </div>
    <button type="submit">create</button>
  </form>
}

export default PostForm