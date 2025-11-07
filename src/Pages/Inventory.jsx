import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import AddProductModal from "../components/AddProductModal/AddProductModal";

export default function Inventory() {
  const products = useSelector((state) => state.inventory.products);
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: "48px", minHeight: "100vh" }}>
      <h1>Inventory</h1>
      <p>
        Manage your product inventory here i.e. add, update, or remove items as needed.
      </p>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => setOpen(true)}
      >
        Add new Product
      </Button>

      {/* ✅ Modal */}
      <AddProductModal open={open} onClose={() => setOpen(false)} />

      {products.length ? <Table sx={{ mt: 3, backgroundImage: "linear-gradient(to top, #ace0f9 0%, #fff1eb 100%)", border: '2px solid black' }}>
        <TableHead>
          <TableRow>
            <TableCell><strong>Name</strong></TableCell>
            <TableCell><strong>Price</strong></TableCell>
            <TableCell><strong>Stock</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map((p) => (
            <TableRow key={p.id}>
              <TableCell>{p.name}</TableCell>
              <TableCell>₹{p.price}</TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell>{p.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> : <></>}
    </div>
  );
}
