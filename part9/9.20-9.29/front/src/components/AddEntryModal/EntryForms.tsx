import { Button } from "@mui/material";
import { useState } from "react";
import HospitalForm from "./Forms/HospitalForm";
import HealthCheckForm from "./Forms/HealthCheckForm";
import OccupationalForm from "./Forms/OccupationalEntryForm";
import { NewEntry } from "../../types";

type FormTypes = "Hospital" | "HealthCheck" | "Occupational"

const EntryForms = ({ onSubmit }: { onSubmit: (values: NewEntry) => void; }) => {
    const [visibleForm, setvisibleForm] = useState<FormTypes>()

    return(
        <div>
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" color="primary" style={{ marginRight: '5px'}} onClick={() => setvisibleForm("Hospital")}>
                    Hospital
                </Button>

                <Button variant="contained" color="primary" style={{ marginRight: '5px'}} onClick={() => setvisibleForm("HealthCheck")}>
                    Health Check
                </Button>

                <Button variant="contained" color="primary" onClick={() => setvisibleForm("Occupational")}>
                    Occupational Health
                </Button>
            </div>

            {visibleForm === "Hospital" && <HospitalForm submit={onSubmit} />}
            {visibleForm === "HealthCheck" && <HealthCheckForm submit={onSubmit} />}
            {visibleForm === "Occupational" && <OccupationalForm submit={onSubmit} />}
        </div>
    )
}

export default EntryForms