import { EntryType } from "../types/types"

const Entries = ({ entries }: { entries: EntryType[] }) => {
    return (
        <div>
            {entries.map(entry => {
                return(
                <div key={entry.id}> 
                    <h2>{entry.date}</h2>
                    <div>Visibility: {entry.visibility}</div>
                    <div>Weather: {entry.weather}</div>
                </div>
                )
            })}
        </div>
    )
}

export default Entries