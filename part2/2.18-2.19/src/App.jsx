import { useState, useEffect } from 'react';
import axios from 'axios';

const Header = ({ title }) => <h2>{title}</h2>

const Country = ({ country }) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
      
      <p><b>Capital:</b> {country.capital}</p>
      <p><b>Area:</b> {country.area} km^2</p>
      <p><b>Population:</b> {country.population} people</p>

      <div>
        <h2>Languages:</h2>
        
        <ul>
          {Object.values(country.languages).map((language, index) =>(
            <li key={index}>{language}</li>
          ))
          }
        </ul>
        
        <img src={country.flags.png} alt={`${country.name.common} flag`} ></img>
      
      </div>
    </div>)
}

const Countries = ({ filteredCountries, selectedCountry, setSelectedCountry }) => {

  const handleShowCountry = (country) => setSelectedCountry(country);

  if (selectedCountry) {
    return <Country country={selectedCountry}/>;
  }
  
  if (filteredCountries.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } 

  else if (filteredCountries.length > 1 && filteredCountries.length <= 10 ) {
  return (
    <div>
      <ul>
      {filteredCountries.map((country, index) =>(
        <li key={index}>{country.name.common} <button onClick={() => handleShowCountry(country)}>Show</button></li>
      ))
      }
      </ul>
    </div>
  );
  } else if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return <Country country={country} />
}
};

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchInput, setSearchInput] = useState('')
  const [selectedCountry, setSelectedCountry] = useState(null);

  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all/'

  const handleSearchInput = (event) => {
    setSearchInput(event.target.value);
    setSelectedCountry(null);
  };

  useEffect (() => {
  axios
  .get(baseUrl)
  .then(response => {
    setCountries(response.data)} 
  )}, [])

  const filteredCountries = countries.filter(country =>
    country.name.common.toLowerCase().includes(searchInput.toLowerCase())
  );
  
  return (
    <div>
      <Header title="Country's data"/>
      
      <label>Find Countries: </label>
      <input placeholder='Type here the country' 
      onChange={handleSearchInput}
      value={searchInput}></input>

      <Countries filteredCountries={filteredCountries} 
      selectedCountry={selectedCountry} 
      setSelectedCountry={setSelectedCountry} />
    </div>
  );
};

export default App