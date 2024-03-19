import Country from "./Country"
import { useState } from "react"
import countryService from '../services/countries'
const CountryItem = ({country}) => {
  const [show, setShow] = useState(false)
  const [searchCountry, setSearchCountry] = useState(null)

  useState(() =>{
    countryService
    .getCountry(country.name.common)
    .then(founded => {
      console.log(founded)
      setSearchCountry(founded)
    })
    .catch(error => console.log(error))
  }, [])

  const handleClick = () => {
    setShow(show ? false : true)
  }
  return (
    <>
    <li className="list-item" key={country.name.common}>{country.name.common}<button onClick={handleClick}>Show</button></li>
    {show && searchCountry && <Country country={searchCountry}/>}
    </>
  )
}

export default CountryItem