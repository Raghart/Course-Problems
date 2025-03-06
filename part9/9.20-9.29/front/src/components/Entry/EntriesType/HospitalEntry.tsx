import { HospitalEntryType, Diagnosis } from "../../../types";
import DiagnosisEntries from "../DiagnosisEntries";
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import HealingIcon from '@mui/icons-material/Healing';

const HospitalEntry = ({entry, diagnoses}: {entry: HospitalEntryType, diagnoses: Diagnosis[]}) => {
    return (
        <div style={{ border: '1px solid black', padding:'10px', marginBottom:'5px'}}>
            <h3>Hospital Entry <HealthAndSafetyIcon /></h3>
            <div><strong>{entry.date}</strong> {entry.description}</div>
            <div>Diagnose by {entry.specialist}.</div>
            <div>
                <p><strong>Discharge information <HealingIcon /></strong></p>
                <ul>
                    <li><strong>{entry.discharge.date}</strong> {entry.discharge.criteria}</li>
                </ul>
            </div>
            {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 && (<DiagnosisEntries entry={entry} diagnoses={diagnoses} />)}
        </div>
    )
}

export default HospitalEntry