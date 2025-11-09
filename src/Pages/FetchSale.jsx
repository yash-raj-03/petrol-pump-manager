import { useState } from "react";
import { Box, Typography, Alert } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

import { useDispatch } from "react-redux";
import { loadSale } from "../store/saleSlice";

import EnterSale from "./EnterSale"; // ✅ reuse the same component

export default function FetchSale() {
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(null);
  const [noDataFound, setNoDataFound] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setLoaded(false);
    setNoDataFound(false);

    if (!date) return;
    const dateKey = new Date(date).toISOString().split("T")[0];
    console.log(dateKey);
    const stored = localStorage.getItem(dateKey);

    if (!stored) {
      setNoDataFound(true);
      return;
    }

    const saleData = JSON.parse(stored);

    // ✅ Load data into Redux
    dispatch(loadSale(saleData));

    setLoaded(true);
  };

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
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Fetch Fuel Sale
        </Typography>

        {/* ✅ Date Picker */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            format="dd-MM-yyyy"
            slotProps={{
              textField: { fullWidth: true, sx: { maxWidth: 300 } },
            }}
          />
        </Box>

        {/* ✅ No Data Found Message */}
        {noDataFound && (
          <Alert severity="warning">
            No sales data found for this date.
          </Alert>
        )}

        {/* ✅ When Data Loaded → Show EnterSale */}
        {loaded && <EnterSale />}
      </Box>
    </LocalizationProvider>
  );
}
