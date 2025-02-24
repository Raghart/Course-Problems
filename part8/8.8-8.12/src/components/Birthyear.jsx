import Select from 'react-select'
import { useState } from "react"
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from "../queries/queries"
import { useMutation } from "@apollo/client"

const Birthyear = ({ authors }) => {
    const [author, setAuthor] = useState(null)
    const [birth, setBirth] = useState('')

    const [ setBirthyear ] = useMutation(EDIT_BIRTHYEAR, {
        refetchQueries: [{ query: ALL_AUTHORS }]
    })

    const options = authors.map(author => ({
        value: author.name,
        label: author.name
    }));

    const submit = (event) => {
        event.preventDefault()

        if (author) {
            setBirthyear({ variables: { name: author.value, setBornTo: parseInt(birth) } })
        }
    
        setBirth('');
    }

    return(
        <div>
            <div><h2>Set Birthyear</h2></div>
            <form onSubmit={submit}>
                <Select options={options} onChange={setAuthor} />
                <div>
                    Birthyear:
                    <input 
                    type="number"
                    value={birth}
                    onChange={({target}) => setBirth(target.value)} />
                </div>
                
                <button type="submit">Edit</button>
            </form>
        </div>
    )
}

export default Birthyear