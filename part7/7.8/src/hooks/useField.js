import { useState } from "react"

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const Reset = () => {
    setValue('')
  }

  const Propfields = {
    type,
    value,
    onChange
  }

  return {
    Propfields,
    Reset
  }
}

export default useField