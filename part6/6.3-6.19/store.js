import { configureStore } from '@reduxjs/toolkit'
import anecdoteSlice from './src/reducers/anecdoteReducer'
import filterSlice from './src/reducers/filterReducer'
import notifSlice from './src/reducers/notificationReducer'

const store = configureStore({
    reducer: {
      anecdotes: anecdoteSlice, 
      filter: filterSlice,
      notification: notifSlice
    }
})

export default store