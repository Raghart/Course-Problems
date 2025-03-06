export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: string;
    occupation: string;
}

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export type SafePatientData = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>