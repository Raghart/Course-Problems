import { JSX } from "react"
import { CoursePartType } from "../types/types"

const Total = ( { courseParts }: { courseParts: CoursePartType[] }): JSX.Element => {
    const Total = courseParts.reduce((acc, part) => acc + part.exerciseCount, 0)
    return(
        <> 
            <p>Number of exercises: {Total}</p>
        </>
    )
}

export default Total