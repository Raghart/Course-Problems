import { SyntheticEvent, useState } from "react";
import { NewEntry, Diagnosis, DiscarcheInfo } from "../../../types";
import { Button } from "@mui/material";
import { FormControl, Select, Box, Chip, MenuItem } from "@mui/material";

const HospitalForm = ({ submit }: { submit: (values: NewEntry) => void; }) => {
    const [date, setDate] = useState<string>('')
    const [dischargeDate, setDischargeDate] = useState<string>('')
    const [criteria, setCriteria] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [specialist, setSpecialist] = useState<string>('')
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);

    const addHospitalEntry = (event: SyntheticEvent) => {
        event.preventDefault()
        const discharge: DiscarcheInfo = { date: dischargeDate, criteria }
            submit({
                date,
                description,
                specialist,
                diagnosisCodes,
                discharge,
                type: "Hospital"
            })
    }

    const Codes = ["M24.2", "M51.2", "S03.5", "J10.1", "J06.9", "Z57.1", "N30.0", "H54.7", "J03.0", "L60.1", 
        "Z74.3", "L20", "F43.2", "S62.5", "H35.29" ];

    return(
    <div>
        <h3>Hospital Form</h3>
        <form onSubmit={addHospitalEntry}>
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
                Discharge Date: <input type="date" value={dischargeDate} onChange={({ target }) => setDischargeDate(target.value)}/>
            </div>

            <div style={{ marginBottom: "5px"}}>
                Criteria: <input type="text" value={criteria} onChange={({ target }) => setCriteria(target.value)} />
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

export default HospitalForm