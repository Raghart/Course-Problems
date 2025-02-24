import { useQuery } from "@apollo/client"
import { ALL_AUTHORS } from "../queries/queries"
import Birthyear from "./Birthyear"

const Authors = (props) => {
  if (!props.show) {
    return null
  }

  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>Loading...</div>
  }

  if (result.data && result.data.allAuthors) {
    return (
      <div>
        <h2>Authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {result.data.allAuthors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <Birthyear authors={result.data.allAuthors} />
      </div>
    )
  }
}


export default Authors
