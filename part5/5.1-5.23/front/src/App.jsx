import React from 'react';
import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import requestService from './services/services';
import LoginForm from './components/LoginForm';
import CreateBlog from './components/CreateBlog';
import Togglable from './components/Toggeable';
import PropTypes from 'prop-types';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);

  const handleLogin = async (event, {username, password}) => {
    event.preventDefault();
      
    try {
      const user = await requestService.login({
        username, password,
      });
        
      console.log(user);
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      );

      requestService.setToken(user.token);
      setUser(user);
      setMessage(`${username} succesfully Logged in!`);
      setUsername('');
      setPassword('');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    } catch (exception) {
      setMessage('The Username or Password are wrong');
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  };

  useEffect(() => {
    requestService.getAll().then(blogs =>
      setBlogs( blogs )
    );
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      requestService.setToken(user.token);
    }
  }, []);

  const Logout = () => {
    window.localStorage.removeItem('loggedNoteappUser');
    setUser(null);
  };

  if (user === null) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password} 
        setPassword={setPassword} 
        message={message}
      />
    );
  }
  
  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired
  };

  return (
    <div>
      <h1>Blogs</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h2>{user.username} is logged in!</h2>
        <button onClick={Logout}>Logout</button>
      </div>
      <div>
        {message && (
          <h2 style={{ fontFamily: 'Arial', color: '#4CAF50', padding: '10px', border: '1px solid #4CAF50', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            {message}
          </h2>
        )}
      </div>
      <h2>Blogs</h2>
      <div style={{ marginBottom:'20px' }}>
        <Togglable buttonLabel="Create a new Blog!">
          <CreateBlog setMessage={setMessage} blogs={blogs} setBlogs={setBlogs}/>
        </Togglable>
      </div>
      {sortedBlogs.map(blog =>
        <Blog key={blog.id} blog={blog} setBlogs={setBlogs} blogs={blogs} setMessage={setMessage} user={user.username} />
      )}
    </div>
  );
};

export default App;