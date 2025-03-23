import { useState } from "react";
import Filter from "./Filter";
import { useEffect } from "react";
import phoneservice from "../phoneservice";

const Persons = ({ persons = [], setPersons }) => {
    const [filterNames, setFilteredNames] = useState('')
     const filteredPersons = Array.isArray(persons)
     ? persons.filter(person => person.name.toLowerCase().includes(filterNames.toLowerCase()))
     : [];

     useEffect(()=> {
        phoneservice
        .getNames()
        .then(response => {
          setPersons(response.data);
      })
        .catch(error => {
          console.error('Error fetching the names', error);
        });
      }, []);

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

    return (
    <>
        <Filter filterNames={filterNames} setFilteredNames={setFilteredNames} />
        {filteredPersons.map(person => 
            <div key={person.id} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <p>{person.name} {person.number}</p>
                <button onClick={() => deleteName(person.id)}>Delete</button>
            </div>
        )}
    </>
    );
};

export default Persons