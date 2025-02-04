import { createContext, useContext } from "react"
import { useReducer } from "react"

export const NotifReducer = (state, action) => {
    switch (action.type) {
      case "VOTE":
        return `The anecdote "${action.payload}" has been voted!`
      case "ADD":
        return `The anecdote "${action.payload}" has been added!`
      case "ERROR":
        return "The Anecdote is too short, it must have at least a length of 5 or more"
      case "RESET":
        return null
      default: 
        return state
    }
}

const NotifContext = createContext()

export const NotifContextProvider = (props) => {
  const [notification, NotifDispatch] = useReducer(NotifReducer, null)

  return (
    <NotifContext.Provider value={ [notification, NotifDispatch] }>
      {props.children}
    </NotifContext.Provider>
  )
}

export const useNotificationValue = () => {
  const counterAndDispatch = useContext(NotifContext)
  return counterAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const counterAndDispatch = useContext(NotifContext)
  return counterAndDispatch[1]
}

export default NotifContext