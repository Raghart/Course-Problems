import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';
import parseNewEntry from '../entry-util';

const router = express.Router();

router.get('/', (_req, res) => {
    res.send(patientService.getPatient());
})

router.get('/:id', (req, res) => {
    try{
        const patient = patientService.getSpecificPatient(req.params.id)
        if (patient) { res.send(patient) }
    } catch (error: unknown) {
        let errorMessage = 'There is not a patient with that ID!';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message
        }
        res.status(400).send(errorMessage)
    }
})

router.post('/', (req, res) => {
    try{
        const newPatient = toNewPatientEntry(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage)
    }
})

router.post('/:id/entries', (req, res) => {
    try{
        const newEntry = parseNewEntry(req.body);
        const AddedEntry = patientService.addEntry(newEntry, req.params.id)
        res.status(200).send(AddedEntry);
    } catch (error: unknown) {
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += ' Error: ' + error.message;
        }
        res.status(400).send(errorMessage)
    }
})

export default router;