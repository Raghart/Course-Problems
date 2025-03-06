import { useParams } from "react-router-dom";
import { Entry, Patient } from "../../types";
import patientService from '../../services/patients';
import { Male, Female } from "@mui/icons-material";
import { useEffect } from "react";
import EntryList from "../Entry/EntryList";
import { useState } from "react";
import { Button } from "@mui/material";
import AddEntryModal from "../AddEntryModal";
import { NewEntry } from "../../types";
import axios from "axios";

const SpecificPatient = () => {
    const [patient, setPatient] = useState<Patient | null>(null);
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [error, setError] = useState<string>()
    const ID = useParams().id

    const submitEntry = async (formValues: NewEntry) => {
        try {
          const newEntry: Entry = await patientService.createEntry(formValues, String(ID));
          if (patient) {
            const ActPatient = {...patient, entries: [...patient.entries, newEntry] }
            setPatient(ActPatient);
            setModalOpen(false);
          }
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e?.response?.data && typeof e?.response?.data === "string") {
                  const message = e.response.data.replace('Something went wrong. Error: ', '');
                  console.error(message);
                  setError(message);
                } else {
                  setError("Unrecognized axios error");
                }
              } else {
                console.error("Unknown error", e);
                setError("Unknown error");
              }
        }
      };

    const openModal = () : void => {
      setModalOpen(true);
      setError(undefined);
    };

    const closeModal = () : void => {
        setModalOpen(false);
        setError(undefined);
    }
    useEffect(() => {
        const getPatient = async (ID: string) =>{
        const response = await patientService.getPatient(ID)
        if (response) { setPatient(response.data) }
        }

        getPatient(ID as string)
    },[])

    if (patient) {
        return(
            <div>
                <div><h2>{patient.name} {patient.gender === "male" ? <Male/> : <Female/> } </h2></div>
                <div><p>SSN: "{patient.ssn}"</p> </div>
                <div><p>Ocuppation: {patient.occupation}</p></div>
                <EntryList patient={patient} />
                <Button variant="contained" color="primary" onClick={() => openModal()}>Add new entry</Button>

                <AddEntryModal 
                modalOpen={modalOpen}
                error={error}
                onClose={closeModal}
                onSubmit={submitEntry}
                />
            
            </div>
        )
    }
    return <div>Patient not found...</div>
}
    
export default SpecificPatient