import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import PostForm from './components/PostForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [msg, setMsg] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }
    catch (exception) {
      setMsg('invalid credentials')
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
  }

  const addPost = async (event) => {
    event.preventDefault()

    try {
      const newPost = {
        title: title,
        author: author,
        url: url
      }

      await blogService
        .create(newPost)
        .then(returnedPost => {
          setBlogs(blogs.concat(returnedPost))
          setMsg(`a new blog ${title} by ${author} added`)
          setTitle('')
          setAuthor('')
          setUrl('')
          setTimeout(() => {
            setMsg(null)
          }, 5000)
        })
    }
    catch (exception) {
      setMsg('failed post')
      setTimeout(() => {
        setMsg(null)
      }, 5000)
    }
  }


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  if (user === null) {
    return (
      <div>
        <Notification message={msg}/>              
        <LoginForm handleLogin={handleLogin} username={username} password={password} userChange={({target}) => setUsername(target.value)} passChange={({target}) => setPassword(target.value)}/>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={msg}/>
      <div>
        <p>{user.name} logged in</p>
        <button onClick={() => {
          window.localStorage.clear()
          window.location.reload()
        }}>log out</button>
      </div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

      <h2>create new</h2>
      <div>
        <PostForm addPost={addPost} title={title} titleChange={({target}) => setTitle(target.value)} author={author} authorChange={({target}) => setAuthor(target.value)} url={url} urlChange={({target}) => setUrl(target.value)}/>
      </div>
    </div>
  )
}

export default App