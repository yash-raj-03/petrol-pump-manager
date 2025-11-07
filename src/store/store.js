import { configureStore } from "@reduxjs/toolkit";
import saleReducer from "./saleSlice"; 
import inventoryReducer from "./inventorySlice";

export const store = configureStore({
  reducer: {
    sale: saleReducer,
    inventory: inventoryReducer,
  },
});
