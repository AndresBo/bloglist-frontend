import { useState } from "react"

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false)

  const setVisibility = () => setVisible(!visible)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if(visible) {  
  return (
  <div style={blogStyle}>
    <div>{blog.title}</div> 
    <div>{blog.author}</div> 
    <div>{blog.url} </div> 
    <div>likes {blog.likes} <button>like</button></div>
    <button onClick={setVisibility}>hide</button>
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
