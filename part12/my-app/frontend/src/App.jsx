import { useState } from 'react';
import Header from './components/Header';
import Notification from './components/Notification';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([])
  const [Message, setMessage] = useState('')
  const [isError, setIsError] = useState(false)

  return (
    <div>
      <Header title='Phonebook'/>
      <Notification message={Message} isError={isError}/>
      
      <Header title='Add a New Person'/>
      <PersonForm setMessage={setMessage} setIsError={setIsError} 
      persons={persons} setPersons={setPersons} /> 
      
      <Header title='Numbers'/>
      <Persons persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App