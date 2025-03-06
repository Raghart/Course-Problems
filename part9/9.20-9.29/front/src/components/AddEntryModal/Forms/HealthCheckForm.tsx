import { SyntheticEvent, useState } from "react";
import { Diagnosis, healthCheckRating, NewEntry } from "../../../types";
import { Select, MenuItem, FormControl, Box, Chip, Button } from '@mui/material';

const HealthCheckForm = ({ submit }: {submit: (values: NewEntry) => void;}) => {
    const [date, setDate] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [specialist, setSpecialist] = useState<string>('')
    const [diagnosisCodes, setDiagnosisCodes] = useState<Array<Diagnosis['code']>>([]);
    const [healthCheckRating, setHealthCheckRating] = useState<healthCheckRating>(0);

    const Ratings = [0, 1, 2 ,3];
    const Codes = ["M24.2", "M51.2", "S03.5", "J10.1", "J06.9", "Z57.1", "N30.0", "H54.7", "J03.0", "L60.1", 
        "Z74.3", "L20", "F43.2", "S62.5", "H35.29" ];

    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: 224,
                width: 250,
            }
        }
    }

    const submitEntry = (event: SyntheticEvent) => {
        event.preventDefault()
        submit({
            date,
            description,
            specialist,
            diagnosisCodes,
            healthCheckRating,
            type: "HealthCheck"
        })
    }

    return(
        <div>
            <h3>Hospital Entry Form</h3>
        <form onSubmit={submitEntry}>
            <div style={{ marginBottom: "5px"}}>
                Date: <input type="date" value={date} onChange={({ target }) => setDate(target.value)}/>
            </div>

            <div style={{ marginBottom: "5px"}}>
                Description: <input type="text" value={description} onChange={({ target }) => setDescription(target.value)} />
            </div>

            <div style={{ marginBottom: "5px"}}>
                Specialist: <input type="text" value={specialist} onChange={({ target }) => setSpecialist(target.value)} />
            </div>

            <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                <p style={{ marginRight: '5px' }}>Health Check Rating:</p> 
                <FormControl>
                    <Select value={healthCheckRating} style={{ height: "35px"}}
                    onChange={({target}) => setHealthCheckRating(Number(target.value))}>
                        {Ratings.map(rating => (
                            <MenuItem key={rating} value={rating}>
                                {rating}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <div style={{ display: "flex", alignItems: "center", flexDirection: "row" }}>
                <p style={{ marginRight: '5px' }}>Diagnosis Codes:</p> 
                <FormControl>
                    <Select multiple value={diagnosisCodes} style={{ height: "40px"}} MenuProps={MenuProps}
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
            <Button type="submit" color="primary" variant="contained">
                Add
            </Button>
        </form>
        </div>
    )
}

export default HealthCheckForm