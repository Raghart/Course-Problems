import React from "react";
import { useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import Home from "./components/Home";
import ShowBlogs from "./components/ShowBlogs";
import { useDispatch } from "react-redux";
import { GetBlogs } from "./slices/BlogSlices";
import { LogoutUser, RememberUser } from "./slices/LoginSlice";
import { useSelector } from "react-redux";
import { Route, Routes, Link } from "react-router-dom";
import Users from "./components/Users";
import User from "./components/User";
import Blog from "./components/Blog";

const App = () => {
  const user = useSelector(state => state.login)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(RememberUser())
  }, []);

  useEffect(() => {
    dispatch(GetBlogs())
  }, []);

  if (user === null) {
    return (
      <LoginForm />
    );
  }

  const style = {
    padding: 5,
    fontSize: '18px',
  }

  return (
    <div className="container" >
      <div style={{ display: "flex", justifyContent: "center", color: "green", marginTop: "50px" }}>
        <h4>{user.username} is logged in!</h4>
        <button onClick={() => dispatch(LogoutUser())} style={{ marginLeft: "15px", color: "blue", backgroundColor: "yellow" }}>Logout</button>
      </div>
      <Notification />

      <div style={{ textAlign: "center" }}>
        <Link style={style} to="/">Home</Link>
        <Link style={style} to="/blogs">Blogs</Link>
        <Link style={style} to="/users">Users</Link>
      </div>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blogs" element={<ShowBlogs />} />
          <Route path="/blogs/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:author" element={<User />} />
        </Routes>
      </div>

    </div>
  );
};

export default App;
