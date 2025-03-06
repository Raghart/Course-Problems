import DiagnosisEntries from "../DiagnosisEntries";
import { HealthCheckEntryType, Diagnosis } from "../../../types";
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckEntry = ({ entry, diagnoses}: {entry: HealthCheckEntryType, diagnoses: Diagnosis[]}) => {
    const HeartColor = (entry: HealthCheckEntryType) => {
        switch(entry.healthCheckRating) {
            case(0):
                return {color: "green"};
            case(1):
                return {color: "yellow"};
            case(2):
                return {color: "red"};
            case(3):
                return {color: "black"}; 
        }
    }
    return(
        <div style={{ border: '1px solid black', padding:'10px', marginBottom:'5px'}}>
            <h3>Health Check Entry <MedicalInformationIcon /> </h3>
            <FavoriteIcon style={HeartColor(entry)} />
            <div><strong>{entry.date}</strong> {entry.description}</div>
            <div>Rating: {entry.healthCheckRating}</div>
            <div>Diagnose by {entry.specialist}.</div>
            {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 && (<DiagnosisEntries entry={entry} diagnoses={diagnoses} />)}
        </div>
    )
}

export default HealthCheckEntry