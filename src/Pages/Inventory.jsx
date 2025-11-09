import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import AddProductModal from "../components/AddProductModal/AddProductModal";
import { deleteProduct, setProducts } from "../store/inventorySlice";

export default function Inventory() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.inventory.products);

  const [open, setOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  // ✅ Load products from localStorage when page loads
  useEffect(() => {
    const data = localStorage.getItem("inventory_products");
    if (data) {
      dispatch(setProducts(JSON.parse(data)));
    }
  }, [dispatch]);

  // ✅ Open modal in add OR edit mode
  const openAddModal = () => {
    setEditProduct(null);
    setOpen(true);
  };

  const openEditModal = (product) => {
    setEditProduct(product);
    setOpen(true);
  };

  // ✅ Delete product
  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  return (
    <div style={{ padding: "48px", minHeight: "100vh" }}>
      <h1>Inventory</h1>
      <p>Manage your product inventory here.</p>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={openAddModal}
      >
        Add new Product
      </Button>

      {/* ✅ Modal: Works for Add & Edit */}
      <AddProductModal
        open={open}
        onClose={() => setOpen(false)}
        editData={editProduct}
      />

      {products.length ? (
        <Table
          sx={{
            mt: 3,
            backgroundImage:
              "linear-gradient(to top, #ace0f9 0%, #fff1eb 100%)",
            border: "2px solid black",
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell><strong>Name</strong></TableCell>
              <TableCell><strong>Price</strong></TableCell>
              <TableCell><strong>Stock</strong></TableCell>
              <TableCell><strong>Description</strong></TableCell>
              <TableCell><strong>Actions</strong></TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {products.map((p) => (
              <TableRow key={p.id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>₹{p.price}</TableCell>
                <TableCell>{p.stock}</TableCell>
                <TableCell>{p.description}</TableCell>

                <TableCell>
                  {/* ✅ Edit */}
                  <IconButton onClick={() => openEditModal(p)}>
                    <EditIcon color="primary" />
                  </IconButton>

                  {/* ✅ Delete */}
                  <IconButton onClick={() => handleDelete(p.id)}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : null}
    </div>
  );
}
