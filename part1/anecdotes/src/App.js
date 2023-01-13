import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  const newAnecdote = () => {
    setSelected(Math.floor(Math.random() * 7))
  }
  const newVotes = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }
  
  const maxVotes = votes.find((element) => element === Math.max(...votes));

  return (
    <>
      <Header text="Anecdote of the day" />
      <Anecdote text={anecdotes[selected]} />
      <p>has {votes[selected]} votes</p>
      <Button clickHandler={newVotes} text="vote" />
      <Button clickHandler={newAnecdote} text="next anecdote" />
      <Header text="Anecdote with the most votes" />
      <Anecdote text={anecdotes[votes.indexOf(maxVotes)]} />
      <Votes votes={maxVotes}/>
    </>
  )
}

const Header = ({text}) => <h1>{text}</h1>
const Button = ({clickHandler, text}) => {
  return <button onClick={clickHandler}>{text}</button>
}
const Anecdote = ({text}) => {
  return <p>{text}</p>
}
const Votes = ({votes}) => {
  return <p>has {votes} votes</p>
}

export default App