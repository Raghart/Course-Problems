import axios from "axios";
import { EntryType, NewEntryType } from "../../types/types";

const baseURL = 'http://localhost:3000/api/diaries'

export const getAllEntries = async () => {
    const res = await axios.get<EntryType[]>(baseURL)
    return res.data
}

export const createEntry = async (obj: NewEntryType): Promise<EntryType | undefined>=> {
    try{

        const res = await axios.post<EntryType>(baseURL, obj)
        return res.data
    
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log(error.status)
            console.error(error.response)
            return undefined

        } else{
            console.log((error as Error).message)
            return undefined
        }
    }
}


