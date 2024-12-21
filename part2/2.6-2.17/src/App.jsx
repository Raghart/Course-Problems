import { useState, useEffect } from 'react';
import phoneservice from './phoneservice';
import './index.css'

const Header = ({ title }) => <h2>{title}</h2>

const Filter = ({ filterNames, setFilteredNames }) => {
  return(
  <div>
      <label>filter shown with </label>
      <input onChange={(event) => setFilteredNames(event.target.value)} value={filterNames}></input>
  </div>
  );
};

const Notification = ({ message, isError }) => {
  if (message === '' ) {
    return null
  }

  return (
    <div className={`message ${isError ? 'error' : 'sucess'}`}>
      <p>{message}</p>
    </div>
  )
}

const PersonForm = ({ addName, setNewName, newName, setNewNumber, newNumber}) => {
  return (
  <form onSubmit={addName}>
      <div>
        <label>name: </label> 
        <input onChange={(event) => setNewName(event.target.value)} value={newName}/>
      </div>
      
      <div>
        <label>number: </label>
        <input onChange={(event) => setNewNumber(event.target.value)} value={newNumber}></input>
      </div>
      
      <button type="submit">add</button>
  </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber, setNewNumber] = useState('')

  const [filterNames, setFilteredNames] = useState('')

  const [Message, setMessage] = useState('')

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filterNames.toLowerCase()));

  useEffect(()=> {
    phoneservice
    .getNames()
    .then(response => {
      setPersons(response.data)
    })
    .catch(error => {
      console.error('Error fetching the names', error);
    });
  }, []);

  const Persons = ({ persons }) => {
    return (
    <>
        {persons.map(person => 
      <div key={person.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <p>{person.name} {person.number}</p>
        <button onClick={() => deleteName(person.id)}>Delete</button>
      </div>
        )}
    </>
    );
  };

  const deleteName = (id) => {
    if (window.confirm(`Are you sure you want to delete this name from the phonebook?`)) {
      phoneservice
      .deleteID(id)
      .then(() => setPersons(prevPersons => prevPersons.filter(person => person.id !== id)))
      .catch(error => {
        console.error('Error deleting the information', error);
      });
    }
  };

  const addName = (event) => {
    event.preventDefault()
    const nameObject = {
      name: newName.trim(),
      number: newNumber.trim()
    }
    if (!newName || !newNumber) {
      alert("Name and Number cannot be empty")
    }
    else if (persons.find(person => person.name.toLocaleLowerCase().trim() === newName.toLocaleLowerCase().trim())) {
      if (window.confirm(`${newName} is already in the phonebook, do you want to replace the old number with this one?`)) 
        {
          const existing_person = persons.find(person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase())
          
          phoneservice
          .replaceName(existing_person.id, nameObject)
          .then(response => {
            setPersons(persons.map(person => person.id !== existing_person.id ? person : response.data));
            setMessage(`The number of ${nameObject.name} has been changed!`);
            setTimeout(() => setMessage(''), 3000)
          })
          .catch(error => {
            setMessage(`Error: ${error.response.data.error}`)
            setTimeout(() => setMessage(''), 3000)
          })
        }
    } else {
    phoneservice
    .create(nameObject)
    .then(response => {
      setPersons(persons.concat(response.data))
    })
    .then(() => {
      setMessage(`The number of ${nameObject.name} has been added!`);
      setTimeout(() => setMessage(''), 3000)
    })
    .catch(error => {
      console.error('Error adding the note', error);
    });
  }
  setNewName('')
  setNewNumber('')
  }

  return (
    <div>
      <Header title='Phonebook'/>
      <Notification message={Message} />
      <Filter setFilteredNames={setFilteredNames} value={filterNames}/>
      
      <Header title='Add a New Person'/>
      <PersonForm addName={addName} setNewName={setNewName} 
      newName={newName} setNewNumber={setNewNumber} newNumber={newNumber}/> 
      
      <Header title='Numbers'/>
      <Persons persons={filteredPersons}/>
    </div>
  )
}

export default App