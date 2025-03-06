import { Entry, Diagnosis } from "../../types";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const DiagnosisEntries = ({entry, diagnoses}:{entry: Entry, diagnoses: Diagnosis[]}) => {
    return (
    <div>
        <h3>Diagnosis Codes <LibraryBooksIcon /></h3>
        <ul>
            {entry.diagnosisCodes?.map(code => {
                const diagnose = diagnoses.find(diagnose => diagnose.code === code)
                if (diagnose) {
                    return <li key={code}>{code} {diagnose.name}.</li>
                }
            }
            )}
        </ul>
    </div>
    )
}

export default DiagnosisEntries