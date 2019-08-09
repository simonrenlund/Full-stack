import React, { useState, useEffect } from 'react'
import backend from './services/backend'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={message.type}>
      {message.msg}
    </div>
  )
}

const Number = ({person,deleteEntry}) => {
  if (person.display === true) {
      return <div>{person.name} {person.number} <button id={person.id} name={person.name} type="button" onClick={deleteEntry}>Delete</button></div>
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

const Persons = ({persons, deleteEntry}) => {
  const Numbers = () => persons.map(person =>
    <Number key={person.name} person={person} deleteEntry={deleteEntry} />
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
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')
  useEffect(() => {
      backend
      .getAll()
      .then(p => {
        p.forEach(function(item) {
          item.display = true
        })
        setPersons(p)
      })

    },[])

  //App functions
  const addPerson = (event) => {
    event.preventDefault()
    let same = 0
    const newObject = {
      name: newName,
      number: newNumber,
      display: true
    }
    //for-loop
    persons.forEach(function(item) {
      const id = item.id
      if (item.name === newName) {
        same = 1
        if (item.number === newNumber) {
          alert(newName + ' is already added to the phonebook.')
        } else if(window.confirm(newName + ' is already added to the phonebook, do you want to update the number?')) {
          backend.update(id,newObject).then(newPerson => {
            setPersons(persons.map(person => person.id !== id ? person : newPerson))
            const newMessage = {
              msg: newPerson.name + ' was updated successfully!',
              type: 'message success'
            }
            setMessage(newMessage)
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          }).catch(error => {
            setMessage(
              {
                msg: error.response.data.error,
                type: 'message error'
              }
            )
            setTimeout(() => {
              setMessage(null)
            }, 3000)
          })
        }
      }
      return
    })
    //end
    if (same === 0) {
      backend.create(newObject).then(person => {
        setPersons(persons.concat(person))
        setMessage({
          msg: person.name + ' was added successfully!',
          type: 'message success'
        })
        setTimeout(() => {
            setMessage(null)
          }, 3000)

      }).catch(error => {
        setMessage(
          {
            msg: error.response.data.error,
            type: 'message error'
          }
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }
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

  const deleteEntry = (event) => {
    if(window.confirm('Really delete ' + event.target.name +'?')) {
      const name = event.target.name
      backend.del(event.target.id).then(response => {
        const newMessage = {
          msg: 'Record was deleted successfully!',
          type: 'message success'
        }
        setMessage(newMessage)
        setTimeout(() => {
          setMessage(null)
        }, 3000)
        backend.getAll().then(p => {
          setPersons(p)
        })
      }).catch(error => {
        setMessage(
          {
            msg: `Person `+ name +` was already removed from server. Please reload the page.`,
            type: 'message error'
          }
        )
        setTimeout(() => {
          setMessage(null)
        }, 3000)
      })
    }
  }

  //The render
  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
      <Filter search={search} searchChange={searchChange}/>
      <h2>Add new number</h2>
      <PersonForm newName={newName} newNumber={newNumber} inputChange={inputChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} deleteEntry={deleteEntry} />
    </div>
  )
}

export default App
