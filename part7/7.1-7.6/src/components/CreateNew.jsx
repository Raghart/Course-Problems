import { useNavigate } from "react-router-dom"
import { useField } from "../hooks"

const CreateNew = ({ addNew }) => {
  const content = useField('text')
  const author = useField('text')
  const URLinfo = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.fieldProps.value,
      author: author.fieldProps.value,
      URL: URLinfo.fieldProps.value,
      votes: 0
    })
    navigate('/')
  }

  const ResetValue = () => {
    content.Reset()
    author.Reset()
    URLinfo.Reset()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content.fieldProps} />
        </div>
        <div>
          author
          <input {...author.fieldProps} />
        </div>
        <div>
          url for more info
          <input {...URLinfo.fieldProps} />
        </div>
        <button>Create</button>
      </form>
      <button onClick={() => ResetValue()}>Reset</button>
    </div>
  )
}

export default CreateNew