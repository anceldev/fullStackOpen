import { useEffect, useState } from 'react'
import countryService from '../services/countries'
import CountriesList from './CountriesList'
import Country from './Country'

const Countries = ({ search, countries }) => {
  const [list, setList] = useState(null)
  const [message, setMessage] = useState(null)
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if(search === ''){
      setMessage(null)
      setList(null)
    }
    makeFilter()
  }, [countries])

  const makeFilter = () => {
    if (search.length > 0) {
      const filteredList = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
      console.log(filteredList)
      if (filteredList.length > 10) {
        setMessage('Too many matches, specify another filter')
        setList(null)
        setCountry(null)
      } else if (filteredList.length > 1) {
        setList(filteredList)
        setMessage(null)
        setCountry(null)
      } else if (filteredList.length === 1) {
        countryService
          .getCountry(filteredList[0].name.common)
          .then(foundCountry => {
            setCountry(foundCountry)
          })
        setMessage(null)
        setList(null)
      }
    }
  }

  if(!countries) return null

  return (
    <div>
      {message && <p>{message}</p>}
      {list && <CountriesList countries={list} />}
      {country && <Country country={country} />}

    </div>
  )
}

export default Countries