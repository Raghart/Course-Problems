import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { ShowNotification } from "../slices/NotifSlices";
import { AppendBlog } from "../slices/BlogSlices";
import { ButtonStyle } from "../styles";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch()

  const onSubmit = (event) => {
    event.preventDefault();
    handleCreate(event, { title, author, url });
  };

  const handleCreate = async (event) => {
    event.preventDefault();
    const newBlog = {
      title,
      author,
      url,
    };
    try {
      dispatch(AppendBlog(newBlog))
      dispatch(ShowNotification(`A new blog "${title}" by ${author} was Succesfully added!`, 5000))
      setTitle("");
      setAuthor("");
      setUrl("");
    } catch (error) {
      console.error("Error", error);
      dispatch(ShowNotification(`${error}`, 10000))
    }
  };

  return (
    <div style={{ padding: "5px" }}>
      <h2 style={{ color: "green" }} >Create a new Blog!</h2>
      <div>
        <form onSubmit={onSubmit}>
          <div style={{ padding: "5px" }}>
            Title:
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
              placeholder="Blog's Title"
            ></input>
          </div>
          <div style={{ padding: "5px" }}> 
            Author:
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
              placeholder="Author"
            ></input>
          </div>
          <div style={{ padding: "5px" }}>
            url:
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
              placeholder="Blog's Url"
            ></input>
          </div>
          <button style={ButtonStyle} type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlog;
