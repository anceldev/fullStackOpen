import CountryItem from "./CountryItem"

const CountriesList = ({countries}) => {

  return (
    <div>
      <ul>
        {countries.map(country => {
          return (

            <CountryItem key={country.name.common} country={country} />
          )
        })
        }
      </ul>
    </div>
  )
}

export default CountriesList