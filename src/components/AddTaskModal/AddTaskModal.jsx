import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    Autocomplete,
} from "@mui/material";
import { useState, useEffect } from "react";

export default function AddTaskModal({ open, onClose, editData, onSave, epics = [] }) {
    const [selectedEpics, setSelectedEpics] = useState('');
    const [name, setName] = useState("");
    const [status, setStatus] = useState("Todo");

    useEffect(() => {
        if (editData) {
            setSelectedEpics(editData.epic);
            setName(editData.name || "");
            setStatus(editData.status || "Todo");
        } else {
            setSelectedEpics('');
            setName("");
            setStatus("Todo");
        }
    }, [editData, open]);

    const handleSave = () => {
        if (!name.trim()) {
            // minimal validation
            return;
        }
        const payload = {
            id: editData?.id,
            epic: selectedEpics,
            name: name.trim(),
            status,
        };
        onSave(payload);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{editData ? "Edit Task" : "Add Task"}</DialogTitle>

            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                    <Autocomplete
                        
                        options={epics.map((e) => e.title)}
                        value={selectedEpics}
                        onChange={(_, v) => setSelectedEpics(v)}
                        renderInput={(params) => <TextField {...params} label="Epic(s)" placeholder="Select epic(s)" />}
                    />

                    <TextField
                        label="Task Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        required
                    />

                    <FormControl fullWidth>
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            labelId="status-label"
                            value={status}
                            label="Status"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="Todo">Todo</MenuItem>
                            <MenuItem value="In Progress">In Progress</MenuItem>
                            <MenuItem value="Done">Done</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>

            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button variant="contained" onClick={handleSave}>
                    {editData ? "Update" : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
}