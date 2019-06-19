import React, { useState } from 'react'

const Number = ({person}) => {
  if (person.display === true) {
      return <div>{person.name} {person.number}</div>
  } else { return <span></span>
  }
}

const Filter = ({search, searchChange}) => {
  return(
    <div>
      Search: <input value={search} onChange={searchChange}></input>
    </div>
  )
}

const Persons = ({persons}) => {
  const Numbers = () => persons.map(person =>
    <Number key={person.name} person={person} />
    )
  return <div>{Numbers()}</div>
}

const PersonForm = ({newName,newNumber,inputChange,addPerson}) => {

  return(
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
  )
}




const App = () => {
  //useStates
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', display: true},
    { name: 'Ada Lovelace', number: '39-44-5323523', display: true },
    { name: 'Dan Abramov', number: '12-43-234345', display: true },
    { name: 'Mary Poppendieck', number: '39-23-6423122', display: true }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [search, setSearch] = useState('')
  //App functions
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
      number: newNumber,
      display: true
    }
    setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }

  const inputChange = (event) => {
    if (event.target.id === "name") {
      setNewName(event.target.value)
    } else {
      setNewNumber(event.target.value)
    }
  }

  const searchChange = (event) => {
    setSearch(event.target.value)
    const s = event.target.value.toLowerCase()
    //const s = search.toLowerCase()
    persons.forEach(function(item) {
      const n = item.name.toLowerCase()
      if (n.includes(s) || s === '') {
        item.display = true
      } else {
        item.display = false
      }
    })
    setPersons(persons)
  }


  //The render
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search={search} searchChange={searchChange}/>
      <h2>Add new number</h2>
      <PersonForm newName={newName} newNumber={newNumber} inputChange={inputChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} />
    </div>
  )
}

export default App
