import { createSlice } from "@reduxjs/toolkit";

const LS_KEY = "inventory_products";

// ✅ Load inventory from localStorage
const loadInitialState = () => {
  try {
    const data = localStorage.getItem(LS_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    products: loadInitialState(), // ✅ start with loaded state
  },
  reducers: {
    setProducts(state, action) {
      state.products = action.payload;
    },

    addProduct(state, action) {
      const newProduct = {
        id: Date.now(),
        ...action.payload,
      };

      state.products.push(newProduct);
      localStorage.setItem(LS_KEY, JSON.stringify(state.products));
    },

    updateProduct(state, action) {
      const { id, updated } = action.payload;
      const idx = state.products.findIndex((p) => p.id === id);

      if (idx !== -1) {
        state.products[idx] = { ...state.products[idx], ...updated };
      }

      localStorage.setItem(LS_KEY, JSON.stringify(state.products));
    },

    deleteProduct(state, action) {
      state.products = state.products.filter((p) => p.id !== action.payload);
      localStorage.setItem(LS_KEY, JSON.stringify(state.products));
    },
  },
});

export const { setProducts, addProduct, updateProduct, deleteProduct } =
  inventorySlice.actions;

export default inventorySlice.reducer;
