import patientData from '../../Data/patients';
import { SafePatientData, Patient, NewPatient, Entry, NewEntry } from '../types/patientTypes';
import { v4 as uuid } from 'uuid';

const getAllPatientInfo = (): Patient[] => {
    return patientData
}

const getPatient = (): SafePatientData[] => {
    return patientData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

const getSpecificPatient = (id: string): Patient | undefined=> {
    const patient = patientData.find(patient => patient.id === id)
    if (patient) {
        return patient
    }
    return undefined
}

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    }

    patientData.push(newPatient);
    return newPatient
}

const addEntry = (entry: NewEntry, patientID: string): Entry => {
    switch (entry.type){
        case("HealthCheck"): {
            const newHealthEntry = {
                id: uuid(),
                ...entry
            }
            for (let i=0; i < patientData.length; i++){
                if (patientData[i].id === patientID ) {
                    patientData[i].entries.push(newHealthEntry)
                }
            }
            return newHealthEntry;
        }
        case("Hospital"): {
            const newHospitalEntry = {
                id: uuid(),
                ...entry
            }
            for (let i=0; i < patientData.length; i++) {
                if (patientData[i].id === patientID) {
                    patientData[i].entries.push(newHospitalEntry)
                }
            }
            return newHospitalEntry
        }
        case("OccupationalHealthcare"): {
            const newOccupationalEntry = {
                id: uuid(),
                ...entry
            }
            for (let i=0; i < patientData.length; i++) {
                if (patientData[i].id === patientID) {
                    patientData[i].entries.push(newOccupationalEntry)
                }
            }
            return newOccupationalEntry
        }
    } 
}

export default {
    getPatient,
    addPatient,
    getAllPatientInfo,
    getSpecificPatient,
    addEntry
}