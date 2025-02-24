import { useState } from "react"
import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries/queries"

const Recommend = ({ show }) => {
    const [genre, setGenre] = useState(null)
    const [genreList, setgenreList] = useState([])

    const {loading, error, data } = useQuery(ALL_BOOKS, {
        variables: { genre },
    })

    if (error) return console.log(error)

    if (!show) return null
    
    if (loading) return <div>Loading...</div>

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

    return(
        <div>
            <div>
                <h1>Recommendations</h1>
                {!genre && (
                    <div>
                        <div><h2>Select your favorite genre!</h2></div>
                        {genreList.map(genre => {
                        return <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
                        })}
                    </div>
                )}
                
                {genre && (
                    <>
                    <p style={{ fontSize: '20px'}}>Books in your favorite genre <strong>{genre}</strong></p>
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
                    </>
                )}         
            </div>
        </div>
    )
}}

export default Recommend