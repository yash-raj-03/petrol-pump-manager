import { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Tabs from "../components/Tabs/Tabs";

export default function EnterSale() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          width: "100%",
          maxWidth: "900px",
          mx: "auto",
          mt: 4,
          px: 2,
          display: "flex",
          flexDirection: "column",
          gap: 4,
        }}
      >
        {/* Page Heading */}
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Enter Fuel Sale
        </Typography>

        {/* Date Picker Section */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            renderInput={(props) => (
              <TextField {...props} fullWidth sx={{ maxWidth: 300 }} />
            )}
          />
        </Box>

        {/* Tabs Section (Sales / Inventory / etc.) */}
        <Tabs />
      </Box>
    </LocalizationProvider>
  );
}
