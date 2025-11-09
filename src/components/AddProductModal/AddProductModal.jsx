import {
  Box,
  Button,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "../../store/inventorySlice";

export default function AddProductModal({ open, onClose, editData }) {
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    unit: "",
    description: "",
  });

  // ✅ Load edit data when editing
  useEffect(() => {
    if (editData) setForm(editData);
  }, [editData]);

  const handleChange = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
  };

  const handleSave = () => {
    if (editData) {
      // ✅ Update existing product
      dispatch(updateProduct({ id: editData.id, updated: form }));
    } else {
      // ✅ Add new product
      dispatch(addProduct(form));
    }

    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "white",
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          {editData ? "Edit Product" : "Add New Product"}
        </Typography>

        <TextField
          label="Product Name"
          fullWidth
          margin="dense"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <TextField
          label="Price"
          fullWidth
          margin="dense"
          type="number"
          value={form.price}
          onChange={(e) => handleChange("price", e.target.value)}
        />

        <TextField
          label="Stock"
          fullWidth
          type="number"
          margin="dense"
          value={form.stock}
          onChange={(e) => handleChange("stock", e.target.value)}
        />

        <TextField
          label="Description"
          fullWidth
          margin="dense"
          multiline
          rows={2}
          value={form.description}
          onChange={(e) => handleChange("description", e.target.value)}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSave}
        >
          {editData ? "Update Product" : "Save Product"}
        </Button>
      </Box>
    </Modal>
  );
}
