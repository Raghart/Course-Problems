import { OccupationalEntryType, Diagnosis } from "../../../types";
import DiagnosisEntries from "../DiagnosisEntries";
import WorkIcon from '@mui/icons-material/Work';

const OccupationalEntry = ({entry, diagnoses}: {entry: OccupationalEntryType, diagnoses: Diagnosis[]}) => {
    return (
        <div style={{ border: '1px solid black', padding:'10px', marginBottom:'5px'}}> 
            <h3> Occupational Entry <WorkIcon /> {entry.employerName}</h3>
            <div> <strong>{entry.date}</strong> {entry.description}</div>
            <div>Diagnose by {entry.specialist}.</div>
            {entry.sickLeave?.startDate && entry.sickLeave?.endDate && (
                <div>
                    <h4>Sick Leave</h4> 
                    <div>Start Date: <strong>{entry.sickLeave.startDate}</strong></div>
                    <div>End Date: <strong>{entry.sickLeave.endDate}</strong></div> 
                </div>
            )}
            {entry.diagnosisCodes && entry.diagnosisCodes.length !== 0 && (<DiagnosisEntries entry={entry} diagnoses={diagnoses} />)}
        </div>
    )
}

export default OccupationalEntry