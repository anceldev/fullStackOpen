import { useEffect, useState } from 'react'
import '../index.css'
import weatherService from '../services/weatherService'

const Country = ({ country }) => {
  const languages = Object.entries(country.languages).map(([key, value]) => value)
  const [capital, setCapital] = useState(null)
  const [iconUrl, setIconUrl] = useState(null)

  useEffect(() => {
    if(country) {
      weatherService
      .getWeather(country.capitalInfo.latlng[0], country.capitalInfo.latlng[1])
      .then(capitalInfo => 
        {
          console.log(capitalInfo)
          const urlIcon = "https://openweathermap.org/img/wn/" + capitalInfo.current.weather[0].icon + "@2x.png"
          setIconUrl(urlIcon)
          setCapital(capitalInfo)
        })
        .catch(error => console.log(error))
    }
  }, [country])

  useEffect(() => {

  }, [capital])

  if(!capital) {
    return null
  }

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capita {country.capital}</p>
      <p>area {country.area}</p>
      <h2>Languages</h2>
      {languages.map(language => {
        return (
          <li className='languages' key={language}>{language}</li>
        )
      })}
      <h2>Flag:</h2>
      <img className='flag-country' src={country.flags.png} alt="flag" />
      <h2>Temperature in {country.capital}</h2>
      <p>temperature {capital.current.temp}</p>
      <img className="icon-weather" src={iconUrl} alt="icon" />
      <p>wind {capital.current.wind_speed}</p>
    </div>
  )
}

export default Country