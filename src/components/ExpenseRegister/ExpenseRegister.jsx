import { useDispatch, useSelector } from "react-redux";
import {
  addExpense,
  updateExpense,
  deleteExpense,
} from "../../store/saleSlice";

import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  IconButton,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ExpenseRegister() {
  const dispatch = useDispatch();
  const expenses = useSelector((state) => state.sale.expenses);

  const emptyRow = {
    expenseType: "",
    mode: "",
    amount: "",
    frequency: "",
    paidTo: "",
    remarks: "",
    comment: "",
  };

  const handleAddRow = () => {
    dispatch(addExpense(emptyRow));
  };

  const handleUpdate = (id, field, value) => {
    dispatch(
      updateExpense({
        id,
        updated: { [field]: value },
      })
    );
  };

  return (
    <Box sx={{ mt: 3, minHeight: '100vh' }}>
      <h2>Expense Register</h2>
      <p>Manage your expenses related to the petrol pump here.</p>
      <br />
      <Button variant="contained" onClick={handleAddRow}>
        + Add Expense
      </Button>

      <Table sx={{ mt: 2 }}>
        <TableHead>
          <TableRow>
            <TableCell>Expense Type</TableCell>
            <TableCell>Mode</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Frequency</TableCell>
            <TableCell>Paid To</TableCell>
            <TableCell>Remarks</TableCell>
            <TableCell>Comment</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {expenses.map((row) => (
            <TableRow key={row.id}>
              {[
                "expenseType",
                "mode",
                "amount",
                "frequency",
                "paidTo",
                "remarks",
                "comment",
              ].map((field) => (
                <TableCell key={field} sx={{ minWidth: 140 }}>
                  <TextField
                    fullWidth
                    value={row[field]}
                    onChange={(e) =>
                      handleUpdate(row.id, field, e.target.value)
                    }
                  />
                </TableCell>
              ))}

              <TableCell>
                <IconButton
                  color="error"
                  onClick={() => dispatch(deleteExpense(row.id))}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
