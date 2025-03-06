export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

interface BaseEntry {
  id: string;
  date: string;
  description: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
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

export interface HealthCheckEntryType extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: healthCheckRating;
}

export interface HospitalEntryType extends BaseEntry {
  type: "Hospital";
  discharge: DiscarcheInfo;
}

export interface SickLeaveInfo {
  startDate: string;
  endDate: string;
}

export interface OccupationalEntryType extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeaveInfo
}

export type Entry = HealthCheckEntryType | HospitalEntryType | OccupationalEntryType;

export type NewEntry = Omit<HealthCheckEntryType, "id"> | Omit<HospitalEntryType, "id"> | Omit<OccupationalEntryType, "id">

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[]
}

export type PatientFormValues = Omit<Patient, "id" | "entries">;