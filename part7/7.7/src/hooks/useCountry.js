import { useState, useEffect } from "react"
import axios from "axios"

const baseURL = 'https://studies.cs.helsinki.fi/restcountries/api/name'

const GetData = async (name) => {
  const response = await axios.get(`${baseURL}/${name}`)
  return response.data
} 

export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
      const GetCountry = async () => {
        if (name.length > 0) {
          try{
            const Data = await GetData(name)
            const CountryData = {
              data: {
                name: Data.name.common,
                capital: Data.capital,
                population: Data.population,
                flag: Data.flags.png
              },
              found: true
            }
            setCountry(CountryData)
          } catch {
            const NotFound  = {
              found: false
            }
            setCountry(NotFound)
          }
        }     
      }
      GetCountry()
      },[name]);
  
    return country
}