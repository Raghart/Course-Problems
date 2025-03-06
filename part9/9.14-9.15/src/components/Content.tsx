import { JSX } from "react"
import { CoursePartType } from "../types/types"
import Part from "./Part"

const Content = ({ courseParts }: {courseParts: CoursePartType[]} ): JSX.Element => {
    return(
        <div>
            <ul>
                {courseParts.map(part => <Part key={part.name} Part={part} />)}
            </ul>
        </div>
    )
}

export default Content