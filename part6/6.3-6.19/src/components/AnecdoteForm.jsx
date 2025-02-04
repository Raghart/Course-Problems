import { useDispatch } from "react-redux"
import { showNotification } from "../reducers/notificationReducer"
import { AppendAnecdotes } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const SubmitAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(AppendAnecdotes(content))
        dispatch(showNotification(`${content} has been added!`, 5000))
    }

    return(
        <div>
            <h2>Create a new anecdote</h2>
            <form onSubmit={(event) => SubmitAnecdote(event)}>
            <div><input name="anecdote"/></div>
            <button type="submit">Create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm