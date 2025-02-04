import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery } from '@tanstack/react-query'
import { getAnecdotes } from './services/request'
import { useMutation } from '@tanstack/react-query'
import { VoteAnecdote } from './services/request'
import { useQueryClient } from '@tanstack/react-query'
import { useNotificationDispatch, useNotificationValue } from './Context/NotifContext'

const App = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const notification = useNotificationValue()

  const VoteMutation = useMutation({
    mutationFn: VoteAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    }
  })

  const handleVote = (anecdote) => {
    VoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
    dispatch({ type: "VOTE" , payload: anecdote.content })
    setTimeout(() => {
      dispatch({ type: "RESET"})
    }, 5000)
  }

  const { isLoading, isError, data } = useQuery({ 
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })

  if (isLoading) {
    return <div>Loading data...</div>
  }

  if (isError) {
    return <div>Anecdote service not avaible due to problems in the server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      {notification &&(<Notification />)}
      <AnecdoteForm />
    
      {data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
