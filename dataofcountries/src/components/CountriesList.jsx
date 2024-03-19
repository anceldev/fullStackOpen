import CountryItem from "./CountryItem"

const CountriesList = ({countries}) => {

  return (
    <div>
      <ul>
        {countries.map(country => {
          return (
            // <li key={country.name.common}>{country.name.common}<button onClick={handleClick}>Show</button></li>
            <CountryItem key={country.name.common} country={country} />
          )
        })
        }
      </ul>
    </div>
  )
}

export default CountriesList