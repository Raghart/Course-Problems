import { Patient, Diagnosis } from "../../types"
import patientService  from "../../services/patients"
import { useState } from "react"
import { useEffect } from "react"
import ShowEntry from "./ShowEntry"

const EntryList = ({patient}: {patient: Patient}) => {
    const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])

    useEffect(() => {
        const RequestDiagnoses = async () => {
            const response = await patientService.getDiagnoses()
            if (response && response.data){
                setDiagnoses(response.data)
            }
        }
        RequestDiagnoses()
    },[])
    
    if (diagnoses.length !== 0) {
        return (
            <div>
                <div><h3>Entries</h3></div>
                {patient.entries.length === 0 ? <div>No Entries Found for this Pacient!</div> : 
                patient.entries.map(entry => <ShowEntry key={entry.id} entry={entry} diagnoses={diagnoses} />)}
            </div>
        )  
    }
    
}

export default EntryList