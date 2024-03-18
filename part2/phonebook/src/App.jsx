import { useEffect, useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notifications from './components/Notifications'
import personService from './services/persons'
import './index.css'
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [message, setMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])


  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      number: newNumber,
      name: newName,
    }
    const findPerson = persons.find(person => person.name.toLowerCase() === newPerson.name.toLowerCase())
    if (findPerson) {
      if (window.confirm(`${findPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        findPerson.number = newNumber
        personService
          .update(findPerson.id, findPerson)
          .then(updatedPerson => {
            const listPersons = persons.filter(person => person.id !== updatedPerson.id)
            setPersons(listPersons.concat(updatedPerson))
            setMessage(
              `Updated ${findPerson.name}`
            )
          })
          .catch(error => {
            console.log(error)
            setIsError(true)
            setMessage(`Information of ${findPerson.name} has already been removed from server`)
          })
      }
    } else {
      personService
        .create(newPerson)
        .then(createdPerson => {
          setPersons(persons.concat(createdPerson))
        })
      setMessage(
        `Added ${newPerson.name}`
      )
    }
    setNewName('')
    setNewNumber('')
    setTimeout(() => {
      setMessage(null)
      setIsError(false)
    }, 5000)
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const deletePerson = id => {
    const person = persons.find(n => n.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deletePerson(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== deletedPerson.id))
        })
        .catch(error => console.log(error))
    }
  }

  const handleSearchText = (event) => {
    const text = event.target.value
    setSearchText(text)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notifications message={message} isError={isError}/>
      <Filter searchText={searchText} handleSearchText={handleSearchText} />
      <PersonForm addName={addName} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <Persons
        listPersons={searchText === ''
          ? persons
          : persons.filter(person => person.name.toLowerCase().includes(searchText.toLowerCase()))}
        deletePerson={deletePerson} />
    </div>
  )
}

export default App