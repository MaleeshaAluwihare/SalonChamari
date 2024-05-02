import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import InventoryChart from "./pieChart";
import InventoryBarChart from "./Bar";
import { useReactToPrint } from 'react-to-print';



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

  const ComponentsRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Employee Manager Report",
    onAfterPrint: () => alert("Report Successfully Downloaded")
  });


  return (
    <div>
      <div>
      </div>
      <div ref={ComponentsRef}>
        <h4>Inventory stocks</h4>
        <table style={{ width: "100%", borderCollapse: "separate" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px",backgroundColor: "green", color: "white", textAlign: "center"}}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px",backgroundColor: "green", color: "white", textAlign: "center" }}>Inventory Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px",backgroundColor: "green", color: "white", textAlign: "center" }}>Quantity</th>
              <th style={{ border: "1px solid #ddd", padding: "8px",backgroundColor: "green", color: "white", textAlign: "center" }}>Price</th>
              <th style={{ border: "1px solid #ddd", padding: "8px",backgroundColor: "green", color: "white", textAlign: "center" }}>Add Date & Time</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.pid}>
                <td>{product.pid}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{formatDate(product.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ marginRight: '20px' }}>
                <InventoryBarChart products={products} />
          </div>     
          <div>
                <InventoryChart products={products} />
          </div>
        </div>
      </div>
      <div>
      </div>
      <div>
        <button
          onClick={handlePrint}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "20px"
          }}
        >
          Download report
        </button>
      </div>
    </div>
  );
}




