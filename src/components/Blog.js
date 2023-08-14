import { useState } from "react"

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)
  
  const setVisibility = () => setVisible(!visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
    maxWidth: 500,
    backgroundColor: '#55868c'
  }

  if(visible) {
    return (
      <div style={blogStyle}>
        <div>{blog.title}</div>
        <div>{blog.author}</div>
        <a href={blog.url}>link</a>
        <div>likes {blog.likes} <button onClick={() => handleLike(blog)}>like</button></div>
        <div>{blog.user.name}</div>
        <button onClick={setVisibility}>hide</button>
        <button onClick={() => handleDelete(blog.id, blog.user.username)}>delete</button>
      </div>
    )
} else {
    return (
      <div style={blogStyle}>
        <div>{blog.title}</div>
        <button onClick={setVisibility}>show</button>
      </div>
    )
}
}

export default Blog
