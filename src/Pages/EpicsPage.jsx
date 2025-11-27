import { useState, useEffect } from "react";
import {
    Box,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    IconButton,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchEpicsFromServer, saveEpicsToServer, removeEpicFromServer } from "../utils/APIUtils";

export default function EpicsPage() {
    const [epics, setEpics] = useState([]);
    const [name, setName] = useState("");

    useEffect(() => {
        const loadEpics = async () => {
            const epics = await fetchEpicsFromServer();
            setEpics(epics);
        };
        loadEpics();
    }, []);

    const addEpic = async () => {
        const trimmed = name.trim();
        if (!trimmed) return;
        const epic = await saveEpicsToServer({ title: trimmed });
        setEpics([...epics, epic]);
        setName("");
    };

    const removeEpic = async (id) => {
        const response = await removeEpicFromServer({ id });
        if (!response) return;
        setEpics(epics.filter((e) => e?.id !== id));
    };

    return (
        <Box sx={{ p: 4 }} style={{ minHeight: "100vh" }}>
            <Typography variant="h4">Epics</Typography>
            <Typography sx={{ mb: 2 }}>Create epics and they will be available in the task epic multiselect.</Typography>

            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <TextField
                    label="New Epic"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addEpic()}
                    fullWidth
                />
                <Button variant="contained" onClick={addEpic}>Add</Button>
            </Box>

            <List>
                {epics.map((e) => (
                    <ListItem
                        key={e?.id}
                        secondaryAction={
                            <IconButton edge="end" onClick={() => removeEpic(e?.id)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                    >
                        <ListItemText primary={e?.title} />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}