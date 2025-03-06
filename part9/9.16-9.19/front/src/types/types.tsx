export enum Visibility {
    poor = "poor",
    good = "good"   
}

export enum Weather {
    rainy = "rainy",
    sunny = "sunny",
    windy = "windy",
    clody = "clody"
}

export interface EntryType {
    id: number;
    date: string;
    weather: Weather;
    visibility: Visibility;
    comment?: string;
}

export type NewEntryType = Omit<EntryType, "id">