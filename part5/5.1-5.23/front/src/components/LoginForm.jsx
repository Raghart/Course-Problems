import React from 'react';
import PropTypes from 'prop-types';

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword , message}) => {

  LoginForm.propTypes = {
    handleLogin: PropTypes.func.isRequired,
    username: PropTypes.string.isRequired,
    setUsername: PropTypes.func.isRequired,
    password: PropTypes.string.isRequired,
    setPassword: PropTypes.func.isRequired,
    message: PropTypes.string
  };
    
  const onSubmit = (event) => {
    event.preventDefault();
    handleLogin(event, { username, password });
  };

  return (
    <div>
      <h1>Log in to the Application</h1>
      {message && (
        <h2 style={{ fontFamily: 'Arial', color: '#4CAF50', padding: '10px', border: '1px solid #4CAF50', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
          {message}
        </h2>
      )}
      <form onSubmit={onSubmit}>
        <div>
          <label>Username
            <input type='text' data-testid="Username input" value={username} onChange={({ target }) => setUsername(target.value)}/>
          </label>   
        </div>
        <div>
          <label>Password
          <input type='password' data-testid="Password input" value={password} onChange={({ target }) => setPassword(target.value)}/>
          </label>
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginForm;