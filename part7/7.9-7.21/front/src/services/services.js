import axios from "axios";
const loginURL = "/api/login";
const blogURL = "/api/blogs";

let token = null;

const setToken = (newToken) => (token = `Bearer ${newToken}`);

const login = async (credentials) => {
  const response = await axios.post(loginURL, credentials);
  return response.data;
};

const createBlog = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(blogURL, newObject, config);
  return response.data;
};

const putLike = async (blog) => {
  const newBlog = { ...blog };
  const blogID = blogURL + `/${newBlog.id}`;
  newBlog.likes += 1;
  const response = await axios.put(blogID, newBlog);
  return response.data;
};

const deleteBlog = async (blog) => {
  const BlogtoDel = { ...blog };
  const blogID_DEL = blogURL + `/${BlogtoDel.id}`;
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(blogID_DEL, config);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(blogURL);
  return response.data
};

const PostComment = async ( NewComment ) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(`${blogURL}/${NewComment.id}/comments`, NewComment , config)
  return response.data
}

export default { login, setToken, createBlog, getAll, putLike, deleteBlog, PostComment };
