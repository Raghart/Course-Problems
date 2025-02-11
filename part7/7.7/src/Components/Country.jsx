const Country = ({ country }) => {
    
    if (!country) {
      return null
    }
  
    if (!country.found) {
      return (
        <div>
          not found...
        </div>
      )
    }
  
    return (
      <div>
        <h2>{country.data.name}</h2>
        <div>Capital: {country.data.capital}</div>
        <div>Population: {country.data.population}</div> 
        <img src={country.data.flag} height='100' alt={`flag of ${country.data.name}`}/>  
      </div>
    )
}
export default Country