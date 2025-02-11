import { useParams } from "react-router-dom"

const Anecdote = ({ anecdotes }) => {
    const AnecdoteID = useParams().id
    const anecdote = anecdotes.find(num => num.id === Number(AnecdoteID))
    return (
        <div>
            <h2>{anecdote.content}</h2>
            <div>Author: {anecdote.author}</div>
            <div>Has {anecdote.votes} votes!</div>
            <div>Enter this url for more info: <a href={anecdote.info}>{anecdote.info}</a></div>
        </div>
    )
}

export default Anecdote 