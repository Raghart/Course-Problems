import { Diagnose } from "./diagnoseTypes";

interface BaseEntry {
    id: string;
    date: string;
    description: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export interface NewBaseEntry extends Omit<BaseEntry, "id"> {
    type: string;
}

export enum healthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

export interface DiscarcheInfo {
    date: string;
    criteria: string
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: healthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital";
    discharge: DiscarcheInfo;
}

export interface SickLeaveInfo {
    startDate: string;
    endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare";
    employerName: string;
    sickLeave?: SickLeaveInfo
}

export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthcareEntry;

export type NewEntry = Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthcareEntry, "id">

export interface Patient {
    id: string;
    name: string;
    ssn: string;
    occupation: string;
    gender: string;
    dateOfBirth: string;
    entries: Entry[]
}

export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export type SafePatientData = Omit<Patient, 'ssn' | 'entries' >;

export type NewPatient = Omit<Patient, 'id'>