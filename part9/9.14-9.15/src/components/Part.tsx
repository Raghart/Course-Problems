import { CoursePartType } from "../types/types"

const Part = ({ Part }: {Part: CoursePartType}) => {
    const assertNever = (value: never): never => {
        throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
    };

    switch(Part.kind) {
        case "basic":
            return(<li><strong>{Part.name} {Part.exerciseCount}</strong><div>{Part.description}</div></li>)
        case "group":
            return(<li><strong>{Part.name} {Part.exerciseCount}</strong>
            <div>Project exercises: {Part.groupProjectCount}</div></li>)
        case "background":
            return(<li><strong>{Part.name} {Part.exerciseCount}</strong>
            <div>{Part.description}</div> <div>Submit to {Part.backgroundMaterial}</div></li>)
        case "special":
            return(<li><strong>{Part.name} {Part.exerciseCount}</strong>
            <div>{Part.description}</div><div>Required skills: {Part.requirements.join(", ")}</div></li>)
        default:
            return assertNever(Part)
    }
}

export default Part