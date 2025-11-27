import { Box, Button, Typography } from "@mui/material";

export default function TaskBoardDashboard() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        gap: 3,
        px: 2,
      }}
    >
      <Typography variant="h4" fontWeight="bold">
        Task Board
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          width: "100%",
          maxWidth: 300,
        }}
      >
        <Button
          component="a"
          href="/taskboard-table"
          variant="contained"
          size="large"
          fullWidth
        >
          Tasks List
        </Button>

        <Button
          component="a"
          href="/taskboard-epics"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Epics
        </Button>
      </Box>

    </Box>
  );
}
