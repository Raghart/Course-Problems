import { useSelector } from "react-redux"
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom"

const Users = () => {
    const blogs = useSelector(state => state.blogs)
    const BlogsMade = [...blogs].reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + 1
        return acc
    },{})

    const style = {
        padding: 5,
        fontSize: '18px'
      }

    return(
        <div>
            <h2 style={{ color: "green" }}>Users</h2>
            <Table striped >
                <thead>
                    <tr>
                        <th>Registered Users</th>
                        <th>Blog's made</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(BlogsMade).map(([author, count]) => 
                        <tr key={author}>
                            <td>
                                <Link style={style} to={`/users/${author}`}>{author}</Link>
                            </td>
                            <td>
                                {count}
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    )
}

export default Users