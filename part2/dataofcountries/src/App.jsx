import { useEffect, useState } from 'react'
import countriesService from './services/countries'
import Countries from './components/Countries'
function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)

  useEffect(() => {
    countriesService
      .getCountries()
      .then(countriesList => {
        setCountries(countriesList)
      })
      .catch(error => console.log(error))
  }, [search])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  if (!countries) {
    return null
  }

  return (
    <div>
      find countries <input
        type="text"
        value={search}
        onChange={handleSearch}
      />
      <Countries search={search} countries={countries} />
    </div>
  )
}

export default App
