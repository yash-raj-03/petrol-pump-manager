import { useState } from "react";
import { Box, Typography, TextField } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Tabs from "../components/Tabs/Tabs";

export default function EnterSale() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openingTime, setOpeningTime] = useState(null);
  const [closingTime, setClosingTime] = useState(null);

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

        {/* Date + Time Section */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            gap: 3,
            width: "100%",
          }}
        >
          {/* Date Picker */}
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            slotProps={{
              textField: { fullWidth: true, sx: { maxWidth: 300 } },
            }}
          />

          {/* Opening Time */}
          <TimePicker
            label="Opening Time"
            value={openingTime}
            onChange={(newTime) => setOpeningTime(newTime)}
            slotProps={{
              textField: { fullWidth: true, sx: { maxWidth: 250 } },
            }}
          />

          {/* Closing Time */}
          <TimePicker
            label="Closing Time"
            value={closingTime}
            onChange={(newTime) => setClosingTime(newTime)}
            slotProps={{
              textField: { fullWidth: true, sx: { maxWidth: 250 } },
            }}
          />
        </Box>

        {/* Tabs Section */}
        <Tabs />
      </Box>
    </LocalizationProvider>
  );
}
