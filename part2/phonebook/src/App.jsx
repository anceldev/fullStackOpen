import { useState } from 'react'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [listPersons, setListPersons] = useState(persons)
  const [searchText, setSearchText] = useState('')
  const addName = (event) => {
    event.preventDefault()

    const newId = persons.length + 1
    const newPerson = {
      name: newName,
      number: newNumber,
      id: newId
    }

    const filterNames = persons.filter(person => person.name.toLowerCase() === newPerson.name.toLowerCase())

    if (filterNames.length > 0) {
      alert(`${newPerson.name} is already in phonebook`)
      setNewName('')
      setNewNumber('')
    } else {
      setListPersons(persons.concat(newPerson))
      setPersons(persons.concat(newPerson))
      setNewName('')
      setNewNumber('')
    }
  }
  const handleNewName = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }
  const handleSearchText = (event) => {
    const text = event.target.value
    setSearchText(text)
    if(text === '') {
      setListPersons(persons)
    } else {
      const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(text.toLowerCase()))
      setListPersons(filteredPersons)
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchText={searchText} handleSearchText={handleSearchText} />
      <PersonForm addName={addName} newName={newName} handleNewName={handleNewName} newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Persons listPersons={listPersons} />
    </div>
  )
}

export default App