import { useState, useEffect } from "react"
import axios from "axios"

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const GetData = async () => {
        const response = await axios.get(baseUrl)
        return setResources(response.data)
    }

    const PostData = async (resource) => {
      const response = await axios.post(baseUrl, resource)
      return response.data
    }

    useEffect(() => {
        GetData()
    },[])
  
    const create = async (resource) => {
      const AddResource = await PostData(resource)
      setResources([...resources, AddResource])
    }
  
    const service = {
      create
    }
  
    return [
      resources, service
    ]
  }