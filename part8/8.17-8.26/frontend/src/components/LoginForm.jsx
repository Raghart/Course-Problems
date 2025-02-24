import { useState } from "react"
import { useMutation } from '@apollo/client'
import { LOGIN } from "../queries/queries"
import { useEffect } from "react"

const Login = ({show, setToken, setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [ login, result ] = useMutation(LOGIN)
    
    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value
            setToken(token)
            localStorage.setItem('books-user-token', token)
            setPage("authors")
        }
    }, [result.data])

    if (!show) return null

    const submit = (event) => {
        event.preventDefault()

        login({ variables:{ username, password } })

        setUsername('')
        setPassword('')
    }

    return(
        <div>
            <div><h1>Login</h1></div>
            <form onSubmit={submit}>

                <div>
                    Username 
                    <input 
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                    />
                </div>

                <div>
                    Password
                    <input 
                    value={password}
                    type="password"
                    onChange={({ target }) => setPassword(target.value)}
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    )
}

export default Login