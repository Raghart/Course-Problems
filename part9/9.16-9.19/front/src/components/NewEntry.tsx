import { NewEntryType, Weather, Visibility, EntryType } from "../types/types";
import { parseString, parseVisibility, parseWeather } from "./utils";
import { createEntry } from "./service/DiaryService";
import { useState } from "react";

const NewEntry = ({ entries, setEntries, notification, setNotification}: {
    entries: EntryType[], setEntries: React.Dispatch <React.SetStateAction<EntryType[]> >,
    notification: string, setNotification: React.Dispatch <React.SetStateAction<string> >,
}) => {
    const [date, setDate] = useState<unknown>('')
    const [visibility, setVisibility] = useState<unknown>('')
    const [weather, setWeather] = useState<unknown>('')
    const [comment, setComment] = useState<unknown>('')
    
    const submitEntry = async (event: React.SyntheticEvent) => {
        event.preventDefault()
        try{
            if (date && visibility && weather) {
            
                const newEntry: NewEntryType = { 
                    date: parseString(date), 
                    visibility: parseVisibility(visibility), 
                    weather: parseWeather(weather), 
                    comment:'' 
                }
                
                if (comment) { 
                    newEntry.comment = parseString(comment) 
                }
    
                const EntryData = await createEntry(newEntry)
                
                if (EntryData) {
                    setDate('')
                    setVisibility('')
                    setWeather('')
                    setComment('')
                    setEntries(entries.concat(EntryData))
                    return console.log("Entry added!")
                }
                throw new Error('There is an Error trying to create the Entry') 
            }
            throw new Error("There are required fields missing from the Submit!")
        } catch(e) {
            console.log((e as Error).message)
            setNotification((e as Error).message)
            setTimeout(() => {
                setNotification('')
            },5000)
        }
    } 

    return (
    <div>
        <h2>Add an Entry</h2>
        {notification && (<div style={{ fontSize: '20px', color: 'red'}}>{notification}</div>)}
        <form onSubmit={submitEntry}>
            <div>
                <input type="date" value={date as string} min="2025-03-01" onChange={({target}) => setDate(target.value)}/>
            </div>
            <div>
                {Object.values(Visibility).map(visibilityType =>
                <div key={visibilityType} style={{ display: "inline-block" }}>
                    <label>{visibilityType}</label> 
                    <input name="visibility" checked={visibility === visibilityType} 
                    type="radio" value={visibilityType} onChange={({target}) => {setVisibility(target.value)}} /> 
                </div>
                )}
            </div>
            <div>
                {Object.values(Weather).map(weatherType => 
                <div key={weatherType} style={{ display: "inline-block"}}>
                    <label>{weatherType}</label>
                    <input name="weather" type="radio" checked={weather === weatherType} 
                    value={weatherType} onChange={({target}) => setWeather(target.value)} />
                </div>
            )}    
            </div>
            <div>
                Comment: <input type="text" value={comment as string} onChange={({target}) => setComment(target.value)} />
            </div>
            <button type="submit">Add Entry</button>
        </form>
    </div>
    )
}

export default NewEntry