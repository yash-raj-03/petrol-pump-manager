import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import FuelSaleEntry from "../FuelSaleEntry/FuelSaleEntry";
import ExpenseRegister from "../ExpenseRegister/ExpenseRegister";
import TotalSales from "../TotalSales/TotalSales";
import ProductSales from "../ProductSales/ProductSales";

// ---- Tab Panel Helper ---- //
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box sx={{ pt: 2 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function SalesTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      {/* ---- TABS ---- */}
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        centered={false}
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab label="Fuel Sales" />
        <Tab label="Product Sales" />
        <Tab label="Expense Register" />
        <Tab label="Total Sales" />
      </Tabs>

      {/* ---- TAB CONTENT ---- */}
      <TabPanel value={value} index={0}>
        <FuelSaleEntry />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <ProductSales />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <ExpenseRegister />
      </TabPanel>

      <TabPanel value={value} index={3}>
        <TotalSales />
      </TabPanel>
    </Box>
  );
}
