import {useState, useEffect} from "react"
import axios from "axios"

const Countries = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState({})

  const handleCountry = (c) => {
    setCountry(c)
  }

  useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
    })
  }, [])

  let output = countries.filter(c => c.name.common.includes(newSearch))

 return countries
        .map(c => 
        <div key={c.name.common}>
          {c.name.common} <button onClick={() => handleCountry(c)}>show</button>
        </div>)
}

export default Countries