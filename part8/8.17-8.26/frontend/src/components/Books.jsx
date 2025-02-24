import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries/queries"
import { useState, useEffect } from "react"

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const [genreList, setgenreList] = useState([])

  const {loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre },
    fetchPolicy: 'cache-first',
  })

  useEffect(() => {
    if (data && data.allBooks) {
  
      if (genreList.length === 0) {
      
        const genresSet = new Set();
        data.allBooks.forEach(book => {
          book.genres.forEach(genre => {
            genresSet.add(genre)
          });
        });
        
        setgenreList(Array.from(genresSet));
      }
    }
  }, [data, genreList.length])  
  
  if (!show) return null

  if (loading) return <div>Loading...</div>

  if (error) return <div>Error {error.message}</div>

    return (
      <div>
        <h2>books</h2>

        {genre && (<div><h3>Currently filtering in genre: {genre}</h3></div>)}
  
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {data.allBooks.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {genreList.map(genre => {
          return <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
        })}
        <button onClick={() => setGenre(null)}>All Genres</button>
      </div>
    )
  }

export default Books
