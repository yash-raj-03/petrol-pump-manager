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
            <Typography variant="h6" fontWeight="bold">
              Machine {idx + 1}
            </Typography>
            <Divider sx={{ my: 1 }} />

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 2,
              }}
            >
              {/* ✅ Petrol Nozzles */}
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                  Petrol Nozzles
                </Typography>

                {["p1", "p2"].map((noz) => {
                  const n = machines[machine][noz];
                  const sale = calcSale(n.open, n.close);

                  return (
                    <Card variant="outlined" key={noz} sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography fontWeight="bold" gutterBottom>
                          {noz === "p1" ? "Petrol Nozzle 1" : "Petrol Nozzle 2"}
                        </Typography>

                        <TextField
                          label="Opening"
                          fullWidth
                          margin="dense"
                          value={n.open}
                          onChange={(e) =>
                            handleReadingChange(
                              machine,
                              noz,
                              "open",
                              e.target.value
                            )
                          }
                        />

                        <TextField
                          label="Closing"
                          fullWidth
                          margin="dense"
                          value={n.close}
                          onChange={(e) =>
                            handleReadingChange(
                              machine,
                              noz,
                              "close",
                              e.target.value
                            )
                          }
                        />

                        <Typography sx={{ mt: 1 }} color="primary">
                          Sale: <strong>{sale.toFixed(2)} L</strong>
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>

              {/* ✅ Diesel Nozzles */}
              <Box sx={{ flex: 1 }}>
                <Typography fontWeight="bold" sx={{ mb: 1 }}>
                  Diesel Nozzles
                </Typography>

                {["d1", "d2"].map((noz) => {
                  const n = machines[machine][noz];
                  const sale = calcSale(n.open, n.close);

                  return (
                    <Card variant="outlined" key={noz} sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography fontWeight="bold" gutterBottom>
                          {noz === "d1"
                            ? "Diesel Nozzle 1"
                            : "Diesel Nozzle 2"}
                        </Typography>

                        <TextField
                          label="Opening"
                          fullWidth
                          margin="dense"
                          value={n.open}
                          onChange={(e) =>
                            handleReadingChange(
                              machine,
                              noz,
                              "open",
                              e.target.value
                            )
                          }
                        />

                        <TextField
                          label="Closing"
                          fullWidth
                          margin="dense"
                          value={n.close}
                          onChange={(e) =>
                            handleReadingChange(
                              machine,
                              noz,
                              "close",
                              e.target.value
                            )
                          }
                        />

                        <Typography sx={{ mt: 1 }} color="primary">
                          Sale: <strong>{sale.toFixed(2)} L</strong>
                        </Typography>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
}
