import React, { useState } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import FuelSaleEntry from "../FuelSaleEntry/FuelSaleEntry";

// ---- Example Components for each tab ---- //
const InventoryComponent = () => <div>Inventory Component Content</div>;
const ReportsComponent = () => <div>Reports Component Content</div>;

// ---- Tab Panel Helper ---- //
function TabPanel({ children, value, index }) {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <Box sx={{ p: 2 }}>
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
        <Tab label="Inventory" />
        <Tab label="Reports" />
      </Tabs>

      {/* ---- TAB CONTENT ---- */}
      <TabPanel value={value} index={0}>
        <FuelSaleEntry />
      </TabPanel>

      <TabPanel value={value} index={1}>
        <InventoryComponent />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <ReportsComponent />
      </TabPanel>
    </Box>
  );
}
