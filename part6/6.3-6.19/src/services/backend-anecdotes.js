import axios from "axios";

const baseURL = 'http://localhost:3001/anecdotes'

const asObject = (anecdote) => {
    return {
      content: anecdote,
      votes: 0
    }
}

const getAll = async() => {
    const response = await axios.get(baseURL)
    return response.data
}

const AddAnecdote = async (anecdote) => {
    const response = await axios.post(baseURL, asObject(anecdote))
    return response.data
}

export const VoteBackend = async (anecdote) => {
    const VotedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };
    const response = await axios.put(`${baseURL}/${anecdote.id}`, VotedAnecdote)
    return response.data
}

export default { getAll, AddAnecdote, VoteBackend }