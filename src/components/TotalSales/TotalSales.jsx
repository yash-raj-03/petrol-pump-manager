import { useSelector } from "react-redux";
import { Box, Button, Card, CardContent, Divider, Typography } from "@mui/material";

export default function TotalSales() {
  const sale = useSelector((state) => state.sale);

  const {
    totals,        // fuel totals
    productSales,  // product sold list
    expenses,      // expenses list
    date
  } = sale;

  // ✅ Calculate product sales total
  const productTotal = productSales.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  // ✅ Calculate expense total
  const expenseTotal = expenses.reduce((sum, ex) => sum + Number(ex.amount || 0), 0);

  // ✅ Fuel total already exists in slice
  const fuelTotal = Number(totals.totalAmount || 0);

  // ✅ Final net total
  const finalTotal = fuelTotal + productTotal - expenseTotal;

  // ✅ Save entire sale object for that date
  const handleSave = () => {
    const dateKey = new Date(date).toISOString().split("T")[0];

    const key = `${dateKey}`; // unique per date
    localStorage.setItem(key, JSON.stringify(sale));
    alert("✅ Sale saved successfully for " + new Date(date).toLocaleDateString());
  };

  return (
    <Box sx={{ mt: 4, minHeight: '100vh' }}>
      <h2>Total Sales</h2>
      <p>Here you can view the total sales data i.e. Total Fuel Sales + Total Product Sales - Total Expenses</p>
      <Card sx={{ p: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" textAlign="center">
            Total Sales Summary
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Fuel Total */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Fuel Sales:</Typography>
            <Typography>₹ {fuelTotal.toFixed(2)}</Typography>
          </Box>

          {/* Product Total */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
            <Typography>Product Sales:</Typography>
            <Typography>₹ {productTotal.toFixed(2)}</Typography>
          </Box>

          {/* Expenses */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography>Expenses:</Typography>
            <Typography>- ₹ {expenseTotal.toFixed(2)}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Net Total */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" fontWeight="bold">
              Net Total:
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              ₹ {finalTotal.toFixed(2)}
            </Typography>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleSave}
          >
            Save Day Sale
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
