import React from 'react';
import { useState } from 'react';
import requestService from '../services/services';
import PropTypes from 'prop-types';

const Blog = ({ blog, setBlogs , blogs, setMessage, user }) => {
  const [BlogVisible, setBlogVisible] = useState(false);

  const toggleBlogVisibility = () => setBlogVisible(!BlogVisible);

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    setBlogs: PropTypes.func.isRequired,
    blogs: PropTypes.array.isRequired,
    setMessage: PropTypes.func.isRequired
  };

  const LikeBlog = async (blog) => {
    try{
      const response = await requestService.putLike(blog);
      setBlogs(blogs.map(b => b.id === blog.id ? response : b));
    } catch (error) {
      console.log('Error Liking the blog:',error);
    }
  };

  const EraseBlog = async (blog) => {
    try{
      window.confirm(`Are you sure you want to remove ${blog.title} by ${blog.author}`);
      await requestService.deleteBlog(blog);
      setMessage('The blog has been successfuly deleted it!');
      setTimeout(() => {
        setMessage('');
      }, 5000);
      setBlogs(blogs.filter(b => b.id !== blog.id));
    } catch (error) {
      console.log(error);
    }
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle}>
    {blog.title} by {blog.author}
      <button onClick={toggleBlogVisibility} style={{ margin:'5px' }}>Show more</button>
      {BlogVisible && (
        <div>
          <div>Likes: {blog.likes} <button onClick={() => LikeBlog(blog)}>Like</button></div> 
          <div>Url: {blog.url}</div>
          {user === blog.author && (<div><button onClick={() => EraseBlog(blog)}>Delete</button></div>)}
        </div>)}
    </div>  
  );};

export default Blog;