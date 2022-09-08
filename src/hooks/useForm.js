import { useState } from "react"

const useForm = (initialState = {}) => {

  const [values, setValues] = useState(initialState)

  const reset = () => {
    setValues(initialState)
  }

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleEmpty = (e) => {
    if (e.target.value === '') {
      setValues({
        ...values,
        [e.target.name]: 1
      })
    }
}

  return [values, handleInputChange, handleEmpty,reset]

}

export default useForm