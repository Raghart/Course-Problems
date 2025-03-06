import axios from "axios";
import { Diagnosis, NewEntry, Patient, PatientFormValues, Entry } from "../types";
import { apiBaseUrl } from "../constants";

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(
    `${apiBaseUrl}/patients`
  );

  return data;
};

const getPatient = async (ID: string) => {
  const patient = await axios.get<Patient>(`${apiBaseUrl}/patients/${ID}`)
  if (patient) {
    return patient
  }
  return undefined
};

const getDiagnoses = async () => {
  const diagnoses = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`)
  if (diagnoses) {
    return diagnoses
  }
  return undefined
}

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(
    `${apiBaseUrl}/patients`,
    object
  );

  return data;
};

const createEntry = async (object: NewEntry, ID: string) => {
  const { data } = await axios.post<Entry>(`${apiBaseUrl}/patients/${ID}/entries`, object)
  return data
}

export default {
  getAll, create, getPatient, getDiagnoses, createEntry
};

