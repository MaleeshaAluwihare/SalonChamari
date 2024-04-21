import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function InventoryReplacing() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("salon");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get(`/StudioInventory/display?category=${selectedCategory}`)
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

    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const sendData = (e) => {
    e.preventDefault();

    if (searchInput.trim() !== "") {
      const isNumeric = !isNaN(searchInput.trim());
      const url = isNumeric ? `/StudioInventory/searchById?pid=${searchInput}&category=${selectedCategory}` : `/StudioInventory/searchByName?name=${searchInput}&category=${selectedCategory}`;

      axios.get(url)
        .then((res) => {
          const productData = res.data.product;
          if (productData) {
            setProducts([productData]);
          } else {
            alert("Product not found");
          }
        })
        .catch((err) => {
          alert(err.message);
        });
    } else {
      fetchData();
    }
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <div>
      <div className="container">
        <h1>Inventory Report</h1>
        <div className="container">
          <div className="mb-3">
            <select
              className="form-select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="salon">Salon</option>
              <option value="studio">Studio</option>
            </select>
          </div>
          <form onSubmit={sendData}>
            <label htmlFor="searchInput">Enter Product ID or Name: </label>
            <input
              type="text"
              id="searchInput"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
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
              {products.map((product) => (
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
