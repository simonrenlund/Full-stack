import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({search, searchChange}) => {
    return(
      <div>
        find countries <input value={search} onChange={searchChange}></input>
      </div>
    )
}

const Country = ({country}) => {
  return(
    <div>{country.name}</div>
  )
}

const Language = ({language}) => {
  return(
    <li>{language.name}</li>
  )
}

const Displaydet = ({country}) => {
  console.log(country)
  const Languages = () => country.languages.map(language =>
  <Language key={language.name} language={language} />
  )
  return(
    <div>
      <h2>{country.name}</h2>
      <div>Capital: {country.capital}</div>
      <div>Population: {country.population}</div>
      <h2>Spoken languages</h2>
      <div>{Languages()}</div>
      <br></br>
      <img src={country.flag} alt="flag"></img>
    </div>
  )
}

const Display = ({display}) => {
  if (display.length > 1 && display.length <= 10) {
    const Countries = () => display.map(country =>
      <Country key={country.name} country={country} />
      )
    return <div>{Countries()}</div>
  } else if (display.length === 1) {
    return(<Displaydet country={display[0]} />)
  } else {return( <div>too many dountries to display.</div>)}
}

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [display, setDisplay] = useState([])
  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response => {
        setCountries(response.data)
        setDisplay(response.data)
      })
  },[])

  const searchChange = (event) => {
    setSearch(event.target.value)
    const s = event.target.value.toLowerCase()
    var c = []
    countries.forEach(function(item) {
      const n = item.name.toLowerCase()
      if (n.includes(s) || s === '') {
        c = c.concat(item)
      }
    })
    setDisplay(c)
    //console.log(c)
  }

  return(
    <div>
      <Filter search={search} searchChange={searchChange}/>
      <Display display={display} />
    </div>
  )
}


export default App;
