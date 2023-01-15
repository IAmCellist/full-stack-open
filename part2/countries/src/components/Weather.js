const Weather = ({weather, city}) => {
  console.log(weather)
  return (
    <>
      <h3>Weather in {city}</h3>
      <div>
        temperature {weather.main.temp}
      </div>
      <div>
        wind {} m/s
      </div>
    </>
  )
}

export default Weather