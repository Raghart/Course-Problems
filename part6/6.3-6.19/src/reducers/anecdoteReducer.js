import { createSlice } from "@reduxjs/toolkit"
import requestService from '../services/backend-anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote: (state, action) => {
      state.push(action.payload)
    },
    Vote: (state, action) => {
      const anecdote = state.find(anecdote => anecdote.id === action.payload);
      if (anecdote) { 
        anecdote.votes += 1; 
      }
    },
    setAnecdotes: (state, action) => action.payload
  }
})

export const { addAnecdote, Vote, setAnecdotes } = anecdoteSlice.actions;

export const LoadAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await requestService.getAll()
    dispatch(setAnecdotes(anecdotes))
  } 
}

export const AppendAnecdotes = (content) => {
  return async dispatch => {
  const NewAnecdote = await requestService.AddAnecdote(content)
  dispatch(addAnecdote(NewAnecdote)
)}
}

export const VoteAnecdote = (anecdote) => {
  return async dispatch => {
    await requestService.VoteBackend(anecdote)
    dispatch(Vote(anecdote.id))
  }
}

export default anecdoteSlice.reducer;