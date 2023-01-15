import Weather from "./Weather"
const Country = ({country, handleCountry, weather, icon}) => {
  console.log(country, weather) 
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>
      <h3>languages:</h3>
      <ul>
        {
          Object.keys(country.languages).map(key => <li key={key}>{country.languages[key]}</li>)
        }
      </ul>
      <img src={country.flags.png} alt="A flag of the search country"/>
      {/* <Weather weather={weather} city={country.capital[0]}/> */}
    </div>
    )  
}

export default Country