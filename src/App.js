import { useState, useEffect } from 'react'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import Notification from './components/Notifications'
import blogService from './services/blogs'
import loginService from './services/login'
import CreateForm from './components/CreateForm'
import Toggable from './components/Toggable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // GET ALL BLOGS AT START - SORTED BY NUMBER OF LIKES
  useEffect(() => {
    blogService.getAll().then(blogs => {
      const sorted = blogs.sort((blogA, blogB)=> blogB.likes - blogA.likes)
      setBlogs(sorted)
    })  
  }, [])


  
  // CHECK FOR LOGGED USER AT START
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // set state and token in services/blogs
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  // LOGIN
  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch(exception) {
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  // LOG OUT
  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.clear()
    setUser(null)
  }

  // CREATE BLOG
  const addBlog = (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try {
    blogService
      .create(blogObject)
      .then(returnedObject => {
        setBlogs(blogs.concat(returnedObject))
        setTitle('')
        setAuthor('')
        setUrl('')
        setMessage(`blog ${blogObject.title} has been added`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      })
    } catch(exception) {
      setMessage(`${exception}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  // LIKE BLOG
  const likeBlog = (blog) => {
    // make deep copy of blog object with JSON.parse + JSON.stringify
    const blogObject = JSON.parse(JSON.stringify(blog))
    
    // change the whole 'user' object for just the id of the user  
    blogObject.user = blog.user.id
    blogObject.likes+=1
    
    try {
      blogService
        .like(blogObject)
        .then(updatedBlog => {
          const updatedBlogs = blogs.map(blog => blog.id !== updatedBlog.id ? blog : updatedBlog)
          setBlogs(updatedBlogs)
        })

    } catch(exception) {
      setMessage(`${exception}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  // DELETE BLOG: only user who created blog can deleted. Nested if statements: first checks username
  // of user attached to blog against logged user, and second if block confirms delete operation.
  const deleteBlog = (id, username) => {
    try {
      if (user.username === username){
        if (window.confirm('Delete?')){
          blogService
            .deleteOne(id)
            .then(response => {
              const updatedBlogs = blogs.filter(blog => blog.id !== id)
              setBlogs(updatedBlogs)
            })
        }
      } else {
        setMessage(`only user who created bloglist can delete it`)
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } catch(exception) {
      setMessage(`${exception}`)
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  // RENDER 
  if (user === null) {
    return (
      <div>
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          username={username}
          password={password}
          setPassword={setPassword}
        />
        <Notification message={message} />
      </div>
  )} else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification message={message} />
        <p>{user.name} is logged in</p>
        <Toggable buttonLabel='new blog'>
          <CreateForm
            addBlog={addBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          /> 
        </Toggable> 
        <button type='submit' onClick={handleLogout}>logout</button>
        {blogs.map(blog =>
          <Blog 
            key={blog.id}
            blog={blog}
            handleLike={likeBlog}
            handleDelete={deleteBlog}
          />
        )}
      </div>
    )
  }}

export default App
