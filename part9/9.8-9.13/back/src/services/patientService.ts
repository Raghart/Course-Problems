import patientData from '../../Data/patients'
import { SafePatientData, Patient, NewPatient } from '../types/patientTypes'
import { v4 as uuid } from 'uuid'

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

const addPatient = ( patient: NewPatient ): Patient => {
    const newPatient = {
        id: uuid(),
        ...patient
    }

    patientData.push(newPatient);
    return newPatient
}

export default {
    getPatient,
    addPatient,
    getAllPatientInfo
}