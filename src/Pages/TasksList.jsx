import {
    Box,
    Button,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

import AddTaskModal from "../components/AddTaskModal/AddTaskModal";
import { fetchTasksFromServer, saveTasksToServer, fetchEpicsFromServer, updateTaskToOnServer, removeTaskToOnServer } from "../utils/APIUtils";

export default function TasksList() {
    const [tasks, setTasks] = useState([]);
    const [epics, setEpics] = useState([]);
    const [open, setOpen] = useState(false);
    const [editTask, setEditTask] = useState(null);

    useEffect(() => {
        const loadTasks = async () => {
            const tasks = await fetchTasksFromServer();
            setTasks(tasks);
        };

        const loadEpics = async () => {
            const epics = await fetchEpicsFromServer();
            setEpics(epics);
        };

        loadEpics();
        loadTasks();
    }, []);


    const openAddModal = () => {
        setEditTask(null);
        setOpen(true);
    };

    const openEditModal = (task) => {
        setEditTask(task);
        setOpen(true);
    };

    const handleDelete = async (id) => {
        const response = await removeTaskToOnServer({ id });
        if (response) {
            const next = tasks.filter((t) => t.id !== id);
            setTasks(next);
        }
    };

    const handleSave = async (task) => {
        if (task.id) {
            await updateTaskToOnServer(task);
            const next = tasks.map((t) => (t.id === task.id ? task : t));
            setTasks(next);
        } else {
            const newTask = await saveTasksToServer(task);
            setTasks([...tasks, ...newTask]);
        }
        setOpen(false);
        setEditTask(null);
    };

    return (
        <Box padding={{ xs: 1, md:6 }} style={{ minHeight: "100vh" }}>
            <h1>Tasks</h1>
            <p>Create and manage tasks (epic(s), name, status).</p>

            <Button variant="contained" color="primary" size="large" onClick={openAddModal}>
                Add new Task
            </Button>

            <AddTaskModal
                open={open}
                onClose={() => {
                    setOpen(false);
                    setEditTask(null);
                }}
                editData={editTask}
                onSave={handleSave}
                epics={epics}
            />

            {tasks.length ? (
                <Table
                    sx={{
                        mt: 3,
                        backgroundImage: "linear-gradient(to top, #ace0f9 0%, #fff1eb 100%)",
                        border: "2px solid black",
                    }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>Epic(s)</strong></TableCell>
                            <TableCell><strong>Task Name</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Actions</strong></TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {tasks.map((t) => (
                            <TableRow key={t.id}>
                                <TableCell>
                                    {(Array.isArray(t.epic) ? t.epic : [t.epic])
                                        .filter(Boolean)
                                        .join(", ")}
                                </TableCell>
                                <TableCell>
                                    <Link to={`/tasks/${t.id}`} style={{ textDecoration: "none", color: "#1976d2" }}>
                                        {t.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{t.status}</TableCell>

                                <TableCell>
                                    <IconButton onClick={() => openEditModal(t)}>
                                        <EditIcon color="primary" />
                                    </IconButton>

                                    <IconButton onClick={() => handleDelete(t.id)}>
                                        <DeleteIcon color="error" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <p style={{ marginTop: 20 }}>No tasks yet. Click "Add new Task" to create one.</p>
            )}
        </Box>
    );
}
