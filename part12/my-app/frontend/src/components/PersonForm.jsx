import { useState } from "react";
import phoneservice from "../phoneservice";

const PersonForm = ({ persons, setPersons, setMessage, setIsError }) => {
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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
                setIsError(false);
                setTimeout(() => setMessage(''), 3000);
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
          setIsError(false);
          setTimeout(() => setMessage(''), 3000)
        })
        .catch(error => {
          setMessage(`${error.response.data.error}`)
          setIsError(true);
          setTimeout(() => setMessage(''), 10000)
          console.error('Error adding the note', error.response.data.error);
        });
      }
      setNewName('')
      setNewNumber('')
      }

  return (
  <form onSubmit={addName}>
      <div>
        <label>name: </label> 
        <input data-testid="inputName" onChange={(event) => setNewName(event.target.value)} value={newName}/>
      </div>
      
      <div>
        <label>number: </label>
        <input data-testid="inputNumber" onChange={(event) => setNewNumber(event.target.value)} value={newNumber}></input>
      </div>
      
      <button data-testid="addButton" type="submit">add</button>
  </form>
  )
};

export default PersonForm