import { Box, Typography, Button } from "@mui/material";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useDispatch, useSelector } from "react-redux";
import {
  setDate,
  setOpeningTime,
  setClosingTime,
} from "../store/saleSlice";
import Tabs from "../components/Tabs/Tabs";

export default function EnterSale() {
  const dispatch = useDispatch();

  // ✅ Get values from Redux
  const { date, openingTime, closingTime } = useSelector((state) => state.sale);

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
          {/* ✅ Date Picker (Redux controlled) */}
          <DatePicker
            label="Select Date"
            value={date ? new Date(date) : null}
            onChange={(newDate) => {
              dispatch(setDate(newDate ? newDate.toISOString() : ""));
            }}
            slotProps={{
              textField: { fullWidth: true, sx: { maxWidth: 300 } },
            }}
            format="dd-MM-yyyy"
          />

          {/* ✅ Opening Time */}
          <TimePicker
            label="Opening Time"
            value={openingTime ? new Date(openingTime) : null}
            onChange={(newTime) =>
              dispatch(
                setOpeningTime(newTime ? newTime.toISOString() : "")
              )
            }
            slotProps={{
              textField: { fullWidth: true, sx: { maxWidth: 250 } },
            }}
          />

          {/* ✅ Closing Time */}
          <TimePicker
            label="Closing Time"
            value={closingTime ? new Date(closingTime) : null}
            onChange={(newTime) =>
              dispatch(
                setClosingTime(newTime ? newTime.toISOString() : "")
              )
            }
            slotProps={{
              textField: { fullWidth: true, sx: { maxWidth: 250 } },
            }}
          />
        </Box>

        {/* Tabs Section */}
        <Tabs />
        <Button
          variant="contained"
          color="primary"
          size="large"
          width="fit-content"
          style={{ margin: 'auto'}}
        >
          Save
        </Button>
        <br />
      </Box>
    </LocalizationProvider>
  );
}
