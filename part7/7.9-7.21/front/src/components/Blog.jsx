import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { DeleteBlog, LikeBlog } from "../slices/BlogSlices";
import { useParams } from "react-router-dom";
import Togglable from "./Toggeable";
import CommentForm from "./CommentForm";
import { ButtonStyle } from "../styles";

const Blog = () => {
  const blogs = useSelector(state => state.blogs);
  const user = useSelector(state => state.login);
  const id = useParams().id

  const blog = blogs.find(blog => blog.id === id)

  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  if (blog) {
    return (
      <div style={blogStyle}>
        <div style={{ display: "flex", justifyContent: "center" }} ><h3>{blog.title}</h3></div>
          <div style={{ display: "flex", justifyContent: "center" }} >Url: {blog.url}</div>
          <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
              Likes: {blog.likes}{" "}
              <button onClick={() => dispatch(LikeBlog(blog))} 
              style={{ backgroundColor: "yellow", color: "blue", marginLeft: "10px" }}>Like</button>
            </div>
            <div style={{ display: "flex", justifyContent: "center" }}>{`Added by ${blog.author}`}</div>
            {user.username === blog.author && (
            <div>
              <button onClick={() => dispatch(DeleteBlog(blog))}>Delete</button>
            </div>
            )}
        </div>

        <div style={{ padding: "5px" }}>
            <h3>Comments</h3>
            <Togglable buttonLabel="Add a Comment!" >
                <CommentForm blog={blog} />
            </Togglable>
            {blog.comments.length === 0 && <div>No comments avaible yet...</div>}
            {blog.comments.length > 0 && (
            <div>
                <ul>
                  {blog.comments.map((comment, index) => <li key={index}>{comment}</li> )}
                </ul>
            </div>
            )}
        </div>
      </div>
    );
  }
}
  

export default Blog;
