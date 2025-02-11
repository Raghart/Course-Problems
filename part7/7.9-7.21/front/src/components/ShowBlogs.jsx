import Togglable from "./Toggeable"
import CreateBlog from "./CreateBlog"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"

const ShowBlogs = () =>{
    const blogs = useSelector(state => state.blogs)
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: "solid",
        borderWidth: 1,
        marginBottom: 5,
        display: "flex",
        justifyContent: "center",
      };
    
    return (
        <div>
            <h2  style={{ color: "green" }}>Blogs</h2>
            <div style={{ marginBottom: "20px" }}>
                <Togglable buttonLabel="Create a new Blog!">
                    <CreateBlog />
                </Togglable>
            </div>
            <div>
                {sortedBlogs.map((blog) => (
                    <div style={blogStyle} key={blog.id}>
                        <Link to={`/blogs/${blog.id}`} style={{ color: "green" }}>{blog.title}</Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ShowBlogs
