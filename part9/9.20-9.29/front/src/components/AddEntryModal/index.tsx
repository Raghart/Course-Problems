import { Dialog, DialogTitle, DialogContent, Divider, Alert } from "@mui/material";
import EntryForms from "./EntryForms";
import { NewEntry } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  error?: string;
  onSubmit: (formValues: NewEntry) => void;
}

const AddEntryModal = ({ modalOpen, onClose, error, onSubmit }: Props) => (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
        <DialogTitle>Add a new entry</DialogTitle>
        <Divider />
        <DialogContent>
            {error && <Alert severity="error" >{error}</Alert>}
            <EntryForms onSubmit={onSubmit}/>
        </DialogContent>
    </Dialog>
)

export default AddEntryModal