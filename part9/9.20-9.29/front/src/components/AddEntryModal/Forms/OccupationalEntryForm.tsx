import { SyntheticEvent, useState } from "react";
import { Diagnosis, NewEntry, SickLeaveInfo } from "../../../types";
import { Select, MenuItem, FormControl, Box, Chip, Button } from '@mui/material';

const OccupationalForm = ({ submit }: {submit: (formValues: NewEntry) => void; }) => {
    const [date, setDate] = useState<string>('')
    const [sickStartDate, setSickStartDate] = useState<string>('')
    const [sickEndDate, setSickEndDate] = useState<string>('')
    const [employerName, setEmployerName] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [specialist, setSpecialist] = useState<string>('')
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);

    const Codes = ["M24.2", "M51.2", "S03.5", "J10.1", "J06.9", "Z57.1", "N30.0", "H54.7", "J03.0", "L60.1", 
        "Z74.3", "L20", "F43.2", "S62.5", "H35.29"];

    const addOccupationalEntry = (event: SyntheticEvent) => {
        event.preventDefault()
        const newOccupationalEntry: NewEntry = {
            date,
            description,
            specialist,
            diagnosisCodes,
            employerName,
            type: "OccupationalHealthcare"
        }

        if (sickStartDate && sickEndDate) {
            const sickLeaveObj: SickLeaveInfo = { startDate: sickStartDate, endDate: sickEndDate}
            newOccupationalEntry.sickLeave = sickLeaveObj
        }

        submit(newOccupationalEntry)
    }

    return(
        <div>
            <h3>Occupational Health Form</h3>
            <form onSubmit={addOccupationalEntry}>

            <div style={{ marginBottom: "5px"}}>
                Date: <input type="date" value={date} onChange={({ target }) => setDate(target.value)}/>
            </div>

            <div style={{ marginBottom: "5px"}}>
                Description: <input type="text" value={description} onChange={({ target }) => setDescription(target.value)} />
            </div>

            <div style={{ marginBottom: "5px"}}>
                Specialist: <input type="text" value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
            </div>

            <div style={{ marginBottom: "5px"}}>
                Employee: <input type="text" value={employerName} onChange={({ target }) => setEmployerName(target.value)} />
            </div>

            <div>
                <h4>SickLeave</h4>
                
                <div style={{ marginBottom: "5px"}}>
                    Start Date: <input type="date" value={sickStartDate} onChange={({ target }) => setSickStartDate(target.value)}/>
                </div>
                
                <div style={{ marginBottom: "5px"}}>
                    End Date: <input type="date" value={sickEndDate} onChange={({ target }) => setSickEndDate(target.value)}/>
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                <p style={{ marginRight: '5px' }}>Diagnosis Codes:</p> 
                <FormControl>
                    <Select multiple value={diagnosisCodes} style={{ height: "40px"}}
                    onChange={({target}) => setDiagnosisCodes(typeof target.value === 'string' ? target.value.split(',') : target.value)}
                    renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                        <Chip key={value} label={value} />
                    ))}
                    </Box>
                    )}
                        >
                        {Codes.map(code => (
                            <MenuItem key={code} value={code}>
                                {code}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <Button type="submit" variant="contained" color="primary">Add</Button>
            </form>
        </div>
    )
}

export default OccupationalForm