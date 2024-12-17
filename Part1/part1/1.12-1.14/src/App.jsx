import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

const Votes = ({votes_anecdotes, selected}) => <div><p>Has {votes_anecdotes[selected]} votes</p></div>

const Most_votes = ({anecdotes, votes_anecdotes}) => {
  const maxVotes = Math.max(...votes_anecdotes)
  const maxIndex = votes_anecdotes.indexOf(maxVotes)
  
  return(
  <div>
    <h1>Anecdote with most votes</h1>
    <div>
      {anecdotes[maxIndex]}
    </div>
  </div>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes_anecdotes, setVotes] = useState(new Uint8Array(8))

  return (
    <div>
      {anecdotes[selected]}
      <Votes votes_anecdotes={votes_anecdotes} selected={selected}/>
    
      <Button onClick={() => {
        const newVotes = [...votes_anecdotes];
        newVotes[selected] += 1;
        setVotes(newVotes);
      }} text="Vote"/>

      <Button onClick={() => setSelected(Math.floor(Math.random() * 8))} text="Next Anecdote"/>

      <Most_votes anecdotes={anecdotes} votes_anecdotes={votes_anecdotes}/>
    </div>
  )
}

export default App
