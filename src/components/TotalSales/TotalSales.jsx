import { Button } from "@mui/material";

export default function TotalSales() {
  return <>
    <h2>Total Sales</h2>
    <p>Here you can view the total sales data i.e. Total Fuel Sales + Total Product Sales - Total Expenses</p>
    <Button
      variant="contained"
      color="primary"
      size="large"
      width="fit-content"
      style={{ margin: 'auto' }}
    >
      Save
    </Button>
  </>
}