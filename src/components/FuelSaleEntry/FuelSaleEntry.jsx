import {
  Box,
  Typography,
  TextField,
  Card,
  CardContent,
  Divider,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  setPrice,
  setNozzleReading,
  updateTotals
} from "../../store/saleSlice";

export default function FuelSaleEntry() {
  const dispatch = useDispatch();

  // ✅ Get all values from Redux
  const { prices, machines } = useSelector((state) => state.sale);

  // ✅ Update Fuel Price
  const handlePriceChange = (fuel, value) => {
    dispatch(setPrice({ fuel, value }));
    dispatch(updateTotals());
  };

  // ✅ Update Nozzle Reading
  const handleReadingChange = (machine, nozzle, field, value) => {
    dispatch(setNozzleReading({ machine, nozzle, field, value }));
    dispatch(updateTotals());
  };

  // ✅ Calculate sale for each nozzle
  const calcSale = (open, close) => {
    const o = parseFloat(open) || 0;
    const c = parseFloat(close) || 0;
    return Math.max(c - o, 0);
  };

  // ✅ Calculate totals using Redux state
  const calcTotals = () => {
    let petrolTotal = 0;
    let dieselTotal = 0;

    ["machine1", "machine2"].forEach((m) => {
      petrolTotal += calcSale(machines[m].p1.open, machines[m].p1.close);
      petrolTotal += calcSale(machines[m].p2.open, machines[m].p2.close);

      dieselTotal += calcSale(machines[m].d1.open, machines[m].d1.close);
      dieselTotal += calcSale(machines[m].d2.open, machines[m].d2.close);
    });

    return { petrolTotal, dieselTotal };
  };

  const { petrolTotal, dieselTotal } = calcTotals();

  const roundedPetrolTotal = Number(petrolTotal.toFixed(2));
  const roundedDieselTotal = Number(dieselTotal.toFixed(2));

  const petrolAmount = Number(
    (roundedPetrolTotal * (parseFloat(prices.petrol) || 0)).toFixed(2)
  );

  const dieselAmount = Number(
    (roundedDieselTotal * (parseFloat(prices.diesel) || 0)).toFixed(2)
  );

  const grandTotal = Number((petrolAmount + dieselAmount).toFixed(2));

  return (
    <Box sx={{ width: "100%" }}>
      <h2>Fuel Sale Entry</h2>
      <p>Enter the fuel sale details below.</p>
      <br />
      {/* ✅ FUEL PRICES FIRST (TOP) */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Fuel Prices
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Petrol Price (₹)"
              type="number"
              value={prices.petrol}
              onChange={(e) =>
                handlePriceChange("petrol", e.target.value)
              }
              onWheel={(e) => e.target.blur()}
            />

            <TextField
              label="Diesel Price (₹)"
              type="number"
              value={prices.diesel}
              onChange={(e) =>
                handlePriceChange("diesel", e.target.value)
              }
              onWheel={(e) => e.target.blur()}
            />
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6">Total Sale</Typography>

          <Typography sx={{ mt: 1 }} color="primary">
            Petrol Sold: <strong>{roundedPetrolTotal} L</strong>
          </Typography>

          <Typography sx={{ mb: 1 }}>
            Petrol Amount: <strong>₹ {petrolAmount}</strong>
          </Typography>

          <Typography color="success.main">
            Diesel Sold: <strong>{roundedDieselTotal} L</strong>
          </Typography>

          <Typography sx={{ mb: 1 }}>
            Diesel Amount: <strong>₹ {dieselAmount}</strong>
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" fontWeight="bold">
            Total Amount: <strong>₹ {grandTotal}</strong>
          </Typography>
        </CardContent>
      </Card>

      {/* ✅ MACHINE SECTIONS */}
      {["machine1", "machine2"].map((machine, idx) => (
        <Card key={machine} sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
              Machine {idx + 1}
            </Typography>

            {[
              { key: "p1", label: "Petrol Nozzle 1" },
              { key: "p2", label: "Petrol Nozzle 2" },
              { key: "d1", label: "Diesel Nozzle 1" },
              { key: "d2", label: "Diesel Nozzle 2" },
            ].map(({ key, label }) => {
              const noz = machines[machine][key];
              const sale = calcSale(noz.open, noz.close);

              return (
                <Box
                  key={key}
                  sx={{
                    mb: 2,
                    display: "flex",
                    flexDirection: { xs: 'column', md: 'row' },
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 4,
                    border: "1px solid #ddd",
                    borderRadius: 2,
                    p: 2,
                  }}
                >
                  {/* LABEL */}
                  <Typography
                    fontWeight="bold"
                    sx={{ mb: 1, fontSize: "1rem" }}
                  >
                    {label}
                  </Typography>

                  {/* INPUT ROW */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: { xs: "column", sm: "row" },
                      gap: 2,
                    }}
                  >
                    <TextField
                      label="Opening"
                      fullWidth
                      value={noz.open}
                      onChange={(e) =>
                        handleReadingChange(machine, key, "open", e.target.value)
                      }
                      onWheel={(e) => e.target.blur()}
                    />

                    <TextField
                      label="Closing"
                      fullWidth
                      value={noz.close}
                      onChange={(e) =>
                        handleReadingChange(machine, key, "close", e.target.value)
                      }
                      onWheel={(e) => e.target.blur()}
                    />
                  </Box>

                  {/* SALE */}
                  <Typography sx={{ mt: 1 }} color="primary">
                    Sale: <strong>{sale.toFixed(2)} L</strong>
                  </Typography>
                </Box>
              );
            })}
          </CardContent>
        </Card>
      ))}

    </Box>
  );
}
