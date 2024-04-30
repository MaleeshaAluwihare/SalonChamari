import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";
import { Typography, Table, TableHead, TableBody, TableRow, TableCell, Button } from "@mui/material";
import ChartComponent1 from "./Chart1";

export default function StockTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    function getProducts() {
      axios
        .get("http://localhost:8070/StudioInventory/display")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getProducts();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Inventory Manager Report",
    onAfterPrint: () => alert("Report Successfully Download"),
  });

  return (
    <div>
      <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }} ref={ComponentsRef}>
        <Typography variant="h4" style={{ marginBottom: "10px" }}>
          Inventory stocks
        </Typography>

        <Table style={{ borderCollapse: "collapse", width: "100%" }}>
          <TableHead>
            <TableRow style={{ borderBottom: "1px solid #ddd" }}>
              <TableCell style={{ padding: "8px", textAlign: "left" }}>ID</TableCell>
              <TableCell style={{ padding: "8px", textAlign: "left" }}>Inventory Name</TableCell>
              <TableCell style={{ padding: "8px", textAlign: "left" }}>Quantity</TableCell>
              <TableCell style={{ padding: "8px", textAlign: "left" }}>Price</TableCell>
              <TableCell style={{ padding: "8px", textAlign: "left" }}>Add Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.pid} style={{ borderBottom: "1px solid #ddd" }}>
                <TableCell style={{ padding: "8px", textAlign: "left" }}>{product.pid}</TableCell>
                <TableCell style={{ padding: "8px", textAlign: "left" }}>{product.name}</TableCell>
                <TableCell style={{ padding: "8px", textAlign: "left" }}>{product.quantity}</TableCell>
                <TableCell style={{ padding: "8px", textAlign: "left" }}>{product.price}</TableCell>
                <TableCell style={{ padding: "8px", textAlign: "left" }}>{formatDate(product.date)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <ChartComponent1 />
      <Button
        variant="contained"
        style={{ margin: "20px", padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", borderRadius: "5px" }}
        onClick={handlePrint}
      >
        Download report
      </Button>
    </div>
  );
}


