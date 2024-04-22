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
    axios.get(url)
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
        fetchData(); // Fetch data again after deletion
      })
      .catch((error) => {
        alert(error.response.data.status);
      });
  };

  const formatDate = (dateString) => {
    if (!dateString) return ""; // Return empty string for null or undefined date

    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date"; // Return "Invalid Date" for invalid date string

    return date.toLocaleString('en-US', { 
      year: 'numeric', 
      month: '2-digit', 
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit' 
    });
  };

  const filteredProducts = products.filter((product) => {
    if (!searchInput.trim()) return true; // If search input is empty, show all products
    const searchLowerCase = searchInput.trim().toLowerCase();
    return product.pid.toString().includes(searchLowerCase) || product.name.toLowerCase().includes(searchLowerCase);
  });

  return (
    <div>
      <div className="container">
        <h1>Inventory Report</h1>
        <div className="SearchBar">
          <input type="text" placeholder="Enter ID or Name.." value={searchInput} onChange={(event) => setSearchInput(event.target.value)} />
          <button className="btn btn-sm btn-primary mx-1" onClick={() => setSearchInput("")}>Clear</button>
        </div>
        <div className="container">
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All</option>
            <option value="saloon">Saloon</option>
            <option value="studio">Studio</option>
          </select>
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Inventory Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Use Quantity</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.pid}>
                  <td>{product.pid}</td>
                  <td>{product.name}</td>
                  <td>{product.quantity}</td>
                  <td>{product.price}</td>
                  <td>{product.useQuantity}</td>
                  <td>{formatDate(product.date)}</td>
                  <td>
                    <button
                      className="text-decoration-none btn btn-sm btn btn-success"
                      onClick={() => navigate("/update", { state: product })}
                    >
                      Update
                    </button>
                    <button
                      className="text-decoration-none btn btn-sm btn btn-danger mx-1"
                      onClick={() => deleteProduct(product.pid)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="text-decoration-none btn btn-sm btn btn-success"
            onClick={() => navigate("/add")}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
