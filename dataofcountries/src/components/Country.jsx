import '../index.css'

const Country = ({ country }) => {
  const languages = Object.entries(country.languages).map(([key, value]) => value)
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
      <img src={country.flags.png} alt="flag" />
    </div>
  )
}

export default Country