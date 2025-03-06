import { healthCheckRating, NewEntry, NewBaseEntry, DiscarcheInfo, SickLeaveInfo } from "./types/patientTypes";
import { Diagnose } from "./types/diagnoseTypes";

const isObject = (obj: unknown): obj is object => {
    if (!obj || typeof obj !== "object") {
        throw new Error("This is not an correctly formatted object")
    }
    return true
}

const isEntry = (obj: object): obj is NewBaseEntry => {
    if (!("date" in obj) || !("description" in obj) || !("specialist" in obj) || !("type" in obj)) {
        throw new Error("There are importants fields in the object missing!")
    }
    return true
}

const isNewEntry = (obj: NewBaseEntry): obj is NewEntry => {
    if ((obj.type === "HealthCheck") || (obj.type === "OccupationalHealthcare") || (obj.type === "Hospital")){
        return true
    }
    throw new Error("Entry type is no valid")
}

const assertNever = (entry: never): never => {
    throw new Error(`Impossible entry value: ${JSON.stringify(entry)}`
    );
};

const isString = (text: unknown): text is string => {
    return typeof text === "string" || text instanceof String;
};

const parseString = (text: unknown): string => {
    if (!text ||!isString(text)){
        throw new Error(`Text: ${text} is no a valid String!`)
    }
    return text
}

const isHealthRating = (num: number): num is healthCheckRating => {
    return Object.values(healthCheckRating).includes(num) 
}

const isNumber = (num: unknown): num is number => {
    return typeof num === "number" || num instanceof Number;
}

const parseHealthRating = (num: unknown): healthCheckRating => {
    if (!isNumber(num) || !isHealthRating(num) ) {
        throw new Error(`The Health Check Rating: ${num} is not valid!`)
    }
    return num
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> => {
    if (!object || typeof object !== "object" || !("diagnosisCodes" in object)) {
        return [] as Array<Diagnose["code"]>
    }
    return object.diagnosisCodes as Array<Diagnose["code"]>
}

const parseDiscarcheInfo = (object: unknown): DiscarcheInfo => {
    if (!object || typeof object !== "object" || !("date" in object) || !("criteria" in object)) {
        throw new Error("Invalid format for the Discharge info!")
    }

    if (!(isString(object.date)) && !(isString(object.criteria)) ) {
        throw new Error("Date and criteria arent in the correct format!")
    }

    if ((isNaN(Date.parse(object.date as string)) || ((object.criteria as string).length < 5))) {
        throw new Error("Date and / or Criteria doesnt exist!")
    }

    return object as DiscarcheInfo
}

const parseSickLeaveInfo = (object: unknown): SickLeaveInfo => {
    console.log(object)
    if (!object || typeof object !== "object" || !("startDate" in object) || !("endDate" in object)) {
        return {} as SickLeaveInfo;
    }

    if ( !(isString(object.startDate)) && !(isString(object.endDate)) ) {
        throw new Error("Date and criteria arent in the correct format!");
    }
    return object as SickLeaveInfo
}
 
const parseNewEntry = (object: unknown): NewEntry => {
    if (isObject(object) && isEntry(object) && isNewEntry(object)){
        switch(object.type){
            case("HealthCheck"):
                return {
                    date: parseString(object.date),
                    description: parseString(object.description),
                    specialist: parseString(object.specialist),
                    type: object.type,
                    healthCheckRating: parseHealthRating(object.healthCheckRating),
                    diagnosisCodes: parseDiagnosisCodes(object),
                }
            case "Hospital":
                return {
                    date: parseString(object.date),
                    description: parseString(object.description),
                    specialist: parseString(object.specialist),
                    type: object.type,
                    discharge: parseDiscarcheInfo(object.discharge),
                    diagnosisCodes: parseDiagnosisCodes(object)
                }
            case "OccupationalHealthcare":
                return {
                    date: parseString(object.date),
                    description: parseString(object.description),
                    specialist: parseString(object.specialist),
                    type: object.type,
                    employerName: parseString(object.employerName),
                    sickLeave: parseSickLeaveInfo(object.sickLeave),
                    diagnosisCodes: parseDiagnosisCodes(object)
                }
            default:
                return assertNever(object)
        }
    }
    throw new Error("Malformatted object in the entry!")
} 

export default parseNewEntry