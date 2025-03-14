import { NewPatient, Gender } from "./types/patientTypes";

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
}

const parseString = (string: unknown): string => {
    if (!isString(string)) {
        throw new Error('Incorrect or missing name')
    }
    return string;
}

const parseDate = (date: unknown): string => {
    if (!isString(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date
}

const isGender = (gender: string): gender is Gender => {
    return Object.values(Gender).map(g => g.toString().toLowerCase()).includes(gender)
}

const parseGender = (gender: unknown): Gender => {
    if (!isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender
}

const toNewPatientEntry = (object: unknown): NewPatient => {
    if (!object || typeof object !== 'object') {
        throw new Error('Incorrect or missing data');
    }

    if ("name" in object && 'dateOfBirth' in object && "ssn" in object && "gender" in object && "occupation" in object) {
        const newPatient: NewPatient = {
            name: parseString(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseString(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseString(object.occupation)
        }
        return newPatient;
    }
    throw new Error('Incorrect data: some fields are missing');
}

export default toNewPatientEntry;