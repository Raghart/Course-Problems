import { useState } from "react"
import { useDispatch } from "react-redux"
import { AddComment } from "../slices/BlogSlices"
import { ShowNotification } from "../slices/NotifSlices"
import { ButtonStyle } from "../styles"

const CommentForm = ({ blog }) => {
    const [comment, setComment] = useState([])
    const dispatch = useDispatch()
    
    const SubmitComment = (event) => {
        event.preventDefault();
        if (comment.length > 5) {
            dispatch(AddComment(comment, blog.id))
            dispatch(ShowNotification(`The comment "${comment}" was added!`, 5000))
            setComment('')
        } else {
            dispatch(ShowNotification("Your comment is too short, it must be 5 characters or more!", 5000))
        }
       
    }

    return (
    <div>
        <form onSubmit={SubmitComment} style={{ padding: '5px' }}>
            <textarea style={{ width: '500px', backgroundColor: "lightgray" }} value={comment} onChange={({ target }) => setComment(target.value)}
            placeholder="Write here your comment!"></textarea>
            <div>
                <button type="submit" style={ButtonStyle}>Submit your comment!</button>
            </div>
        </form>
    </div>
    )
}

export default CommentForm