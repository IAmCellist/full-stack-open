import {useState, useEffect} from "react"
import axios from "axios"
import Search from "./components/Search"
import Countries from "./components/Countries"
import Country from "./components/Country"

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [newSearch, setNewSearch] = useState('')

  const handleSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <>
      <Search newSearch={newSearch} handleSearch={handleSearch}/>
      <Countries newSearch={newSearch}/>
    </>
  )

  // useEffect(() => {
  //   axios
  //     .get('https://restcountries.com/v3.1/all')
  //     .then(response => {
  //       setCountries(response.data)
  //     })
  // }, [])

  // useEffect(() => {
  //   if (Object.keys(country).length !== 0) {
  //     axios
  //     .get(`https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo.latlng[0]}&lon=${country.capitalInfo.latlng[1]}&appid=${api_key}`)
  //     .then(response => {
  //       setWeather(response.data)
  //     })
  //   }
  // }, [country])

  // const handleSearch = (event) => {
  //   setNewSearch(event.target.value)
  // }

  // const handleCountry = (c) => {
  //   setCountry(c)
  // }

  // let output = countries.filter(c => c.name.common.includes(newSearch))

  // useEffect(() => {
  //   if (output.length > 1 && output.length < 11 && Object.keys(country).length !== 0) {
  //     setCountry({})
  //   }
  // }, [newSearch])

  // const CountriesToShow = () => {
  //   if (output.length > 10) {
  //     return <p>Too many matches, specify another filter</p>
  //   }
  //   if (output.length === 1) {
  //     return <Country country={output[0]} handleCountry={handleCountry} weather={weather}/>
  //   }
  //   return <Countries countries={output} handleCountry={handleCountry} />
  //   //  output.length > 10 ? <p>Too many matches, specify another filter</p> :
  //   // output.length === 1 ? <Country country={output[0]} handleCountry={handleCountry} weather={weather}/> :
  //   // Object.keys(country).length !== 0 ? <Country country={country} handleCountry={handleCountry} weather={weather}/> :
  //   // <Countries countries={output} handleCountry={handleCountry} />
  // }

  // return (
  //   <div>
  //     <Search newSearch={newSearch} handleSearch={handleSearch}/>
  //     {CountriesToShow()}
  //   </div>
  // )
}

export default App