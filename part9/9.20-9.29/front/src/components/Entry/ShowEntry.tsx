import { Entry, Diagnosis } from "../../types"
import HealthCheckEntry from "./EntriesType/HealthCheckEntry"
import HospitalEntry from "./EntriesType/HospitalEntry"
import OccupationalEntry from "./EntriesType/OccupationalEntry";

const assertNever = (entry: never): never => {
    throw new Error(`Impossible entry value: ${JSON.stringify(entry)}`
    );
};

const ShowEntry = ({entry, diagnoses}: { entry: Entry, diagnoses: Diagnosis[] }) => {
    switch(entry.type){
        case "Hospital":
            return <HospitalEntry entry={entry} diagnoses={diagnoses} />
        case "HealthCheck":
            return <HealthCheckEntry entry={entry} diagnoses={diagnoses} />
        case "OccupationalHealthcare":
            return <OccupationalEntry entry={entry} diagnoses={diagnoses} />
        default:
            return assertNever(entry)
    }
};

export default ShowEntry;