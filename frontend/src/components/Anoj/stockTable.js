import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

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
    documentTitle: "Finance Manager Report",
    onAfterPrint: () => alert("Report Successfully Download"),
  });

  return (
    <div>
      <div style={{ margin: "20px", fontFamily: "Arial, sans-serif" }} ref={ComponentsRef}>
        <h2 style={{ marginBottom: "10px" }}>Inventory stocks</h2>

        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid #ddd" }}>
              <th style={{ padding: "8px", textAlign: "left" }}>ID</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Inventory Name</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Quantity</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Price</th>
              <th style={{ padding: "8px", textAlign: "left" }}>Add Date</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.pid} style={{ borderBottom: "1px solid #ddd" }}>
                <td style={{ padding: "8px", textAlign: "left" }}>{product.pid}</td>
                <td style={{ padding: "8px", textAlign: "left" }}>{product.name}</td>
                <td style={{ padding: "8px", textAlign: "left" }}>{product.quantity}</td>
                <td style={{ padding: "8px", textAlign: "left" }}>{product.price}</td>
                <td style={{ padding: "8px", textAlign: "left" }}>{formatDate(product.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button style={{ margin: "20px", padding: "10px 20px", backgroundColor: "#007bff", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer" }} onClick={handlePrint}>Download report</button>
    </div>
  );
}

