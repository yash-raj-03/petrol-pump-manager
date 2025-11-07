import { Box, Button, Typography } from "@mui/material";

export default function Home() {
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
      {/* Heading */}
      <Typography variant="h4" fontWeight="bold">
        Fuel Sales Management System
      </Typography>

      {/* Buttons as links */}
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
          href="/enter-sales"
          variant="contained"
          size="large"
          fullWidth
        >
          Enter Sale
        </Button>

        <Button
          component="a"
          href="/fetch-sales"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Fetch Sale
        </Button>

        <Button
          component="a"
          href="/dashboard"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Dashboard
        </Button>

        <Button
          component="a"
          href="/inventory"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
        >
          Inventory
        </Button>
      </Box>
    </Box>
  );
}
