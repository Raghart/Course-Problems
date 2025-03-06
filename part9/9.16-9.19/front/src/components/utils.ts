import { Weather, Visibility } from "../types/types";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const isWeather = (param: unknown): param is Weather => {
    return Object.values(Weather).map(w => w.toString()).includes(param as string)
}

const isVisibility = (param: unknown): param is Visibility => {
    return Object.values(Visibility).map(v => v.toString()).includes(param as string)
}

export const parseString = (text: unknown): string => {
    if (!isString(text)) {
        throw new Error("Incorrect or missing string")
    }
    return text
}

export const parseWeather = (text: unknown): Weather => {
    if (!isWeather(text)){
        throw new Error("Incorrect or missing weather")
    }
    return text
}

export const parseVisibility = (text: unknown): Visibility => {
    if (!isVisibility(text)) {
        throw new Error("Incorrect or missing Visibility")
    }
    return text
}