import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import "./index.css"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('');
  const [newSearch, setNewSearch] = useState('')
  const [msg, setMsg] = useState({})

  useEffect(() => {
    personService
      .getAll()
      .then(response => setPersons(response))
      .catch(error => {
        setMsg(
          {
            text: error.response.data.error,
            type: "error"
          }
        )
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNumChange = (event) => {
    setNewNum(event.target.value)
  }
  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const inputName = { name: newName, number: newNum};
    if (persons.find(p => (p.name === newName)) !== undefined) {
      return replacePerson(persons.find(p => p.name === newName))
    }
    personService
      .create(inputName)
      .then(response => {
        setPersons(persons.concat(response))
        setNewName('')
        setNewNum('')
        setMsg(
          {text:`Added ${inputName.name}`, 
          type: "success"}
        )
        setTimeout(() => {
          setMsg(null)
        }, 5000)
      })
      .catch(error => {
        setMsg(
          {
            text: error.response.data.error,
            type: "error"
          }
        )
      })
  }

  const deletePerson = (event) => {
    event.preventDefault()
    if (window.confirm(`Delete ${event.target.value}`)) {
      personService
      .del(event.target.id)
        .then(() => {
          setPersons(persons.filter(p => p.id.toString() !== event.target.id))
        })
        .catch(() => {
          setMsg({
            text: `Information ${event.target.value} has already been removed from server`,
            type: "error"
          })
          setTimeout(() => {
            setMsg(null)
          }, 5000)
        })
    }
  }

  const replacePerson = (oldObject) => {
    const updateName = {...oldObject, number: newNum}
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      personService
        .update(updateName, oldObject.id)
        .then(() => {
          setPersons(persons.map(p => p.id === oldObject.id ? updateName : p))
          setNewName('')
          setNewNum('')
          setMsg({
            text: `Added ${updateName.name}`,
            type: "success"
          })
          setTimeout(() => {
            setMsg(null)
          }, 5000)
        })
        .catch(error => {
          setMsg({
            text: error.response.data.error,
            type: "error"
          })
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={msg}/>
      <Filter newSearch={newSearch} handleSearch={handleSearch}/>
      <h3>Add a new</h3>
      <PersonForm newName={newName} newNum={newNum} handleNameChange={handleNameChange} handleNumChange={handleNumChange} addPerson={addPerson}/>
      <h3>Numbers</h3>
      <Persons newSearch={newSearch} persons={persons} deletePerson={deletePerson}/>
    </div>
  )
}

export default App