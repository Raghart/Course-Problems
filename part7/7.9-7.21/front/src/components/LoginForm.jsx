import React from "react";
import { useState } from "react";
import Notification from "./Notification";
import { ShowNotification } from "../slices/NotifSlices";
import { Login } from "../slices/LoginSlice";
import { useDispatch } from "react-redux";
import requestService from "../services/services"

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    handleLogin(event, { username, password });
  };

  const handleLogin = async (event, { username, password }) => {
      event.preventDefault();
  
      try {
        const user = await requestService.login({
          username,
          password,
        });
  
        console.log(user);
        window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
        requestService.setToken(user.token);
  
        dispatch(Login(user));
        dispatch(ShowNotification(`${username} succesfully Logged in!`, 5000));
        setUsername("");
        setPassword("");
      } catch (exception) {
        dispatch(ShowNotification("The Username or Password are wrong", 5000));
      }
    };

  return (
    <div>
      <h1>Log in to the Application</h1>
      <Notification />
      <form onSubmit={onSubmit}>
        <div>
          <label>
            Username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </label>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
