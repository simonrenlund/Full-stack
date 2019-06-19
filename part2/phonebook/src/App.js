import React, { useState } from 'react'

const Number = ({person}) => {
  return <div>{person.name} {person.number}</div>
}

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const addPerson = (event) => {
    event.preventDefault()
    let same = 0
    persons.forEach(function(item) {
      if (item.name === newName) {
        alert(newName + ' is already added to the phonebook')
        same = 1
        return
      }
    })
    if (same === 1) {
      setNewName('')
      setNewNumber('')
      return
    }
    const nameObject = {
      name: newName,
      number: newNumber
    }
    console.log(nameObject)
    setPersons(persons.concat(nameObject))
    setNewName('')
  }

  const inputChange = (event) => {
    if (event.target.id === "name") {
      setNewName(event.target.value)
    } else {
      setNewNumber(event.target.value)
    }

  }
  const Numbers = () => persons.map(person =>
    <Number key={person.name} person={person} />
    )
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input id="name" value={newName} onChange={inputChange} />
        </div>
        <div>
          number: <input id="number" value={newNumber} onChange={inputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {Numbers()}
    </div>
  )
}

export default App
