import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Date + Times
  date: new Date().toISOString(),
  openingTime: "",
  closingTime: "",

  // Fuel Prices
  prices: {
    petrol: "",
    diesel: "",
  },

  // Machine Readings (Opening & Closing)
  machines: {
    machine1: {
      p1: { open: "", close: "" },
      p2: { open: "", close: "" },
      d1: { open: "", close: "" },
      d2: { open: "", close: "" },
    },
    machine2: {
      p1: { open: "", close: "" },
      p2: { open: "", close: "" },
      d1: { open: "", close: "" },
      d2: { open: "", close: "" },
    },
  },

  expenses: [],

  // ✅ Total fuel sale + amount
  totals: {
    petrolLiters: 0,
    dieselLiters: 0,
    petrolAmount: 0,
    dieselAmount: 0,
    totalAmount: 0,
  },
};

const saleSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    // ✅ Date
    setDate(state, action) {
      state.date = action.payload;
    },

    // ✅ Opening Time
    setOpeningTime(state, action) {
      state.openingTime = action.payload;
    },

    // ✅ Closing Time
    setClosingTime(state, action) {
      state.closingTime = action.payload;
    },

    // ✅ Fuel Price Update
    setPrice(state, action) {
      const { fuel, value } = action.payload;
      state.prices[fuel] = value;
    },

    // ✅ Update Single Nozzle Reading
    setNozzleReading(state, action) {
      const { machine, nozzle, field, value } = action.payload;
      state.machines[machine][nozzle][field] = value;
    },

    // ✅ Compute All Totals
    updateTotals(state) {
      const calcSale = (open, close) => {
        const o = parseFloat(open) || 0;
        const c = parseFloat(close) || 0;
        return Math.max(c - o, 0);
      };

      let petrolTotal = 0;
      let dieselTotal = 0;

      ["machine1", "machine2"].forEach((m) => {
        petrolTotal += calcSale(
          state.machines[m].p1.open,
          state.machines[m].p1.close
        );
        petrolTotal += calcSale(
          state.machines[m].p2.open,
          state.machines[m].p2.close
        );
        dieselTotal += calcSale(
          state.machines[m].d1.open,
          state.machines[m].d1.close
        );
        dieselTotal += calcSale(
          state.machines[m].d2.open,
          state.machines[m].d2.close
        );
      });

      const petrolPrice = parseFloat(state.prices.petrol) || 0;
      const dieselPrice = parseFloat(state.prices.diesel) || 0;

      const petrolAmount = Number((petrolTotal * petrolPrice).toFixed(2));
      const dieselAmount = Number((dieselTotal * dieselPrice).toFixed(2));
      const totalAmount = Number((petrolAmount + dieselAmount).toFixed(2));

      // ✅ Round + Save totals
      state.totals.petrolLiters = Number(petrolTotal.toFixed(2));
      state.totals.dieselLiters = Number(dieselTotal.toFixed(2));
      state.totals.petrolAmount = petrolAmount;
      state.totals.dieselAmount = dieselAmount;
      state.totals.totalAmount = totalAmount;
    },

    // ✅ Reset Everything
    resetSale() {
      return initialState;
    },

    addExpense(state, action) {
      state.expenses.push({
        id: Date.now(),
        ...action.payload,
      });
    },

    updateExpense(state, action) {
      const { id, updated } = action.payload;
      const index = state.expenses.findIndex((e) => e.id === id);
      if (index !== -1) {
        state.expenses[index] = { ...state.expenses[index], ...updated };
      }
    },

    deleteExpense(state, action) {
      state.expenses = state.expenses.filter((e) => e.id !== action.payload);
    },

  },
});

export const {
  setDate,
  setOpeningTime,
  setClosingTime,
  setPrice,
  setNozzleReading,
  updateTotals,
  resetSale,
  addExpense,
  updateExpense,
  deleteExpense,
} = saleSlice.actions;

export default saleSlice.reducer;
