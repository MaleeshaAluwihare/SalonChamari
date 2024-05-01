import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InventoryReplacing() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchData();
  }, [selectedCategory]);

  const fetchData = () => {
    let url = "/StudioInventory/filter";
    if (selectedCategory !== "All") {
      url += `?category=${selectedCategory}`;
    }
    axios
      .get(url)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  const deleteProduct = (pid) => {
    axios
      .delete(`/StudioInventory/delete/${pid}`)
      .then((res) => {
        alert("Product deleted");
        fetchData();
      })
      .catch((error) => {
        alert(error.response.data.status);
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const filteredProducts = products.filter((product) => {
    if (!searchInput.trim()) return true;
    const searchLowerCase = searchInput.trim().toLowerCase();
    return (
      product.pid.toString().includes(searchLowerCase) ||
      product.name.toLowerCase().includes(searchLowerCase)
    );
  });

  const handleUpdateButtonClick = (product) => {
    navigate("/update", { state: product });
  };
  

  return (
    <div>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1>Inventory Report</h1>
        <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="Enter ID or Name"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            style={{ padding: "8px", flex: 1, marginRight: "10px" }}
          />
          <button
            style={{
              padding: "8px 16px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
            onClick={() => setSearchInput("")}
          >
            Clear
          </button>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: "8px" }}
          >
            <option value="All">All</option>
            <option value="saloon">Saloon</option>
            <option value="studio">Studio</option>
          </select>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Inventory Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Quantity</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Price</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Use Quantity</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ddd", padding: "8px" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.pid}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.pid}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.name}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.quantity}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.price}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{product.useQuantity}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{formatDate(product.date)}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                  <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <button
                    style={{
                      backgroundColor: "#4CAF50",
                      color: "white",
                      padding: "8px 16px",
                      border: "none",
                      cursor: "pointer",
                    }}
                    onClick={() => handleUpdateButtonClick(product)}
                  >
                    Update
                  </button>

                    <button
                      style={{
                        backgroundColor: "#f44336",
                        color: "white",
                        padding: "8px 16px",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => deleteProduct(product.pid)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          style={{
            marginTop: "20px",
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
          onClick={() => navigate("/add")}
        >
          Add
        </button>
      </div>
    </div>
  );
}