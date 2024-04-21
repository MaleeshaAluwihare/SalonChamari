// StockTable.js
import React, { useState, useEffect } from "react";
import axios from "axios";

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
    return new Date(dateString).toLocaleString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit' 
    });
  };

  return (
    <div className="container">
      <h2>Inventory stocks</h2>

      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Inventory Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Add Date</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.pid}>
              <td>{product.pid}</td>
              <td>{product.name}</td>
              <td>{product.quantity}</td>
              <td>{product.price}</td>
              <td>{formatDate(product.date)}</td> {/* Display the date */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
