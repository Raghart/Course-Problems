import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const result = await axios.get(baseURL)
    return result.data
}

export const createAnecdote = async (newObj) => {
    const result = await axios.post(baseURL, newObj)
    return result.data
}

export const VoteAnecdote = async (anecdote) => {
    const result = await axios.put(`${baseURL}/${anecdote.id}`, anecdote)
    return result.data
}