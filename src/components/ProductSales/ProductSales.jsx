import { useDispatch, useSelector } from "react-redux";
import {
  addProductSale,
  updateProductSale,
  deleteProductSale,
} from "../../store/saleSlice";

import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
  MenuItem,
  Select,
  IconButton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

export default function ProductSales() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.inventory.products);
  const productSales = useSelector((state) => state.sale.productSales);

  const [selectedToAdd, setSelectedToAdd] = useState("");

  // ✅ Add product directly from dropdown
  const handleDirectAdd = (productId) => {
    const numId = Number(productId);
    const selected = products.find((p) => p.id === numId);

    if (!selected) return;

    dispatch(
      addProductSale({
        productId: numId,
        quantity: 0,
        price: selected.price,
        amount: selected.price * 1,
      })
    );

    setSelectedToAdd(""); // reset
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
    const numericId = Number(productId); // ✅ fix mismatch
    const selected = products.find((p) => p.id === numericId);

    dispatch(
      updateProductSale({
        id,
        updated: {
          productId: numericId,
          price: selected?.price || 0,
          quantity: 0,
          amount: 0,
        },
      })
    );
  };

  return (
    <Box sx={{ mt: 3, minHeight: "100vh" }}>
      <h2>Products Sold</h2>
      <p>Manage the products sold in the petrol pump.</p>

      {/* ✅ Add Product Sold Dropdown */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        <h3 style={{ margin: 0 }}>Add Product Sold:</h3>

        <Select
          value={selectedToAdd}
          displayEmpty
          onChange={(e) => handleDirectAdd(e.target.value)}
          sx={{ width: 250 }}
        >
          <MenuItem value="" disabled>
            Select a product
          </MenuItem>

          {products.map((p) => (
            <MenuItem key={p.id} value={p.id}>
              {p.name}
            </MenuItem>
          ))}
        </Select>
      </Box>

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
          {productSales.map((row) => {
            const selectedProduct = products.find(
              (p) => p.id === row.productId
            );
            const maxQty = selectedProduct?.stock || 0;

            return (
              <TableRow key={row.id}>
                {/* Product selection */}
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
                    error={row.quantity > maxQty}
                    helperText={`Only ${maxQty} available`}
                    value={row.quantity}
                    onChange={(e) => {
                      const qty = Number(e.target.value);
                      if (qty > maxQty) return; // ✅ block overselling

                      handleChange(row.productId, "quantity", qty);
                    }}
                    onWheel={(e) => e.target.blur()}
                    sx={{ marginTop: '20px'}}
                  />
                </TableCell>

                {/* Price */}
                <TableCell>₹{row.price}</TableCell>

                {/* Amount */}
                <TableCell>₹{row.amount}</TableCell>

                {/* Delete */}
                <TableCell>
                  <IconButton
                    onClick={() => dispatch(deleteProductSale(row.id))}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}
