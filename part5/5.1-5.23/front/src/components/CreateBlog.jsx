import React from 'react';
import { useState } from 'react';
import requestService from '../services/services';
import PropTypes from 'prop-types';

const CreateBlog = ({ setMessage, blogs, setBlogs }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  CreateBlog.propTypes = {
    setMessage: PropTypes.func.isRequired,
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleCreate(event, {title, author, url});
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const newBlog = {
      title, author, url
    };
    try {
      const createdBlog = await requestService.createBlog(newBlog);
      setBlogs(blogs.concat(createdBlog));
      setTitle('');
      setAuthor('');
      setUrl('');
      setMessage(`A new blog "${title}" by ${author} was Succesfully added!`);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (error) {
      console.error('Error', error);
      setMessage(`${error}`);
      setTimeout(() => {
        setMessage('');
      }, 10000);
    }
  };

  return(
    <div>
      <h2>Create a new Blog!</h2>
      <div>
        <form onSubmit={onSubmit}>
          <div>
                        Title:
            <input type="text" value={title} onChange={({ target }) => setTitle(target.value)} placeholder="Blog's Title"></input>
          </div>
          <div>
                        Author:
            <input type="text" value={author} onChange={({ target }) => setAuthor(target.value)} placeholder="Author"></input>
          </div>
          <div>
                        url:
            <input type="text" value={url} onChange={({ target }) => setUrl(target.value)} placeholder="Blog's Url"></input>
          </div>
          <button type="submit">Create</button> 
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;