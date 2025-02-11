import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const User = () => {
    const author = useParams().author
    const blogs = useSelector(state => state.blogs)

    const UserBlogs = [...blogs].filter(blog => blog.author === author)
    console.log(UserBlogs)
    
    return(
        <div>
            <h4>Added Blogs</h4>
            <ul>
                {UserBlogs.map(blog => 
                    <li key={blog.id}>
                        {blog.title}
                    </li>
                )}
            </ul>
        </div>
    )
}

export default User