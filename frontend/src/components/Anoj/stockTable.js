import React, { useState, useEffect, useRef } from "react";
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
  const handlePrint = () => {
    const content = ComponentsRef.current;
    const printWindow = window.open("", "_blank");
    printWindow.document.open();
    printWindow.document.write(`
      <html>
        <head>
          <title>Inventory Manager Report</title>
          <style>
            /* CSS styles */
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
            }
            h4 {
              margin-bottom: 10px;
            }
            table {
              border-collapse: collapse;
              width: 100%;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            button {
              margin: 20px;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              border-radius: 5px;
              border: none;
              cursor: pointer;
            }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
    printWindow.onafterprint = () => {
      printWindow.close();
      alert("Report Successfully Downloaded");
    };
  };

  return (
    <div>
      <div ref={ComponentsRef}>
        <h4>Inventory stocks</h4>
        <table>
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
                <td>{formatDate(product.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handlePrint}>Download report</button>
    </div>
  );
}



