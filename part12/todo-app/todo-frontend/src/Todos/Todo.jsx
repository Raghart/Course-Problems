import React from "react";

const Todo = ({ text, done }) => {
    return(
        <div>
            <p>Activity: {text}, Done: {done}</p> 
        </div>
    )
}

export default Todo