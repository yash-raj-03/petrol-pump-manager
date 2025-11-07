import { useDispatch, useSelector } from "react-redux";
import {
  addProductSale,
  updateProductSale,
  deleteProductSale,
} from "../../store/saleSlice";

import {
  Box,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  MenuItem,
  Select,
  IconButton,
  Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";

export default function ProductSales() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.inventory.products);
  const productSales = useSelector((state) => state.sale.productSales);

  const handleAdd = () => {
    dispatch(
      addProductSale({
        productId: "",
        name: "",
        quantity: 0,
        price: 0,
        amount: 0,
      })
    );
  };

  const handleChange = (id, field, value) => {
    dispatch(
      updateProductSale({
        id,
        updated: { [field]: value },
      })
    );
  };

  const handleProductSelect = (id, productId) => {
    const selected = products.find((p) => p.id === Number(productId));

    dispatch(
      updateProductSale({
        id,
        updated: {
          productId,
          name: selected?.name || "",
          price: selected?.price || 0,
        },
      })
    );
  };

  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h4">Products Sold</Typography>
      <Typography>Manage the products sold in the petrol pump.</Typography>
      <br />
      <Button variant="contained" sx={{ my: 2 }} onClick={handleAdd}>
        + Add Product Sold
      </Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {productSales.map((row) => (
            <TableRow key={row.id}>
              {/* Select Product */}
              <TableCell>
                <Select
                  fullWidth
                  value={row.productId}
                  onChange={(e) =>
                    handleProductSelect(row.id, e.target.value)
                  }
                >
                  {products.map((p) => (
                    <MenuItem key={p.id} value={p.id}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>

              {/* Quantity */}
              <TableCell>
                <TextField
                  type="number"
                  fullWidth
                  value={row.quantity}
                  onChange={(e) => {
                    const qty = Number(e.target.value);
                    handleChange(row.id, "quantity", qty);
                    handleChange(row.id, "amount", qty * row.price);
                  }}
                  onWheel={(e) => e.target.blur()}
                />
              </TableCell>

              {/* Price */}
              <TableCell>₹{row.price}</TableCell>

              {/* Amount */}
              <TableCell>₹{row.amount}</TableCell>

              {/* Delete */}
              <TableCell>
                <IconButton onClick={() => dispatch(deleteProductSale(row.id))}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
