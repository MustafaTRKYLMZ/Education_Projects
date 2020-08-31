import React from 'react'
import '../index.css'
const Blog = ({ blog }) => (
  <div clasName='blog'>
    
       {blog.title} {blog.author}
   
   
  </div>
)

export default Blog
