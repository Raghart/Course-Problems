import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { VoteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        if (filter === 'ALL') {
            return anecdotes
        }
        return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()))
    });

    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    const dispatch = useDispatch();

    const vote = (anecdote) => {
    dispatch(VoteAnecdote(anecdote))
    dispatch(showNotification(`You voted for '${anecdote.content}'`, 5000))
    };

    return (
        <>
            {sortedAnecdotes.map(anecdote =>
            <div key={anecdote.id}>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={() => vote(anecdote)}>vote</button>
            </div>
            </div>
            )}
        </>
    )
}

export default AnecdoteList