import { Button, Box } from "@mui/material";

export default function TotalSales() {
  return <>
    <Box sx={{ mt: 3, minHeight: '100vh' }}>
      <h2>Total Sales</h2>
      <p>Here you can view the total sales data i.e. Total Fuel Sales + Total Product Sales - Total Expenses</p>
      <br />
      <Button
        variant="contained"
        color="primary"
        size="large"
        width="fit-content"
        style={{ margin: 'auto' }}
      >
        Save
      </Button>
    </Box>

  </>
}