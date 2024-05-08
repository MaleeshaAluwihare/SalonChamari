import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../css/Anoj/modal.module.css";
import UpdateInventory from "./updateInventory";

export default function InventoryReplacing() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchInput, setSearchInput] = useState("");
  const [modalStyle, setModalStyle] = useState({
    display: 'none'
  })
  const [selected, setSelected] = useState({});
  const [updated,setUpdated] = useState(false);

  useEffect(() => {
    fetchData();
  }, [selectedCategory,updated]);

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
    const productIdLowerCase = product.pid.toString().toLowerCase();
    const productNameLowerCase = product.name.toLowerCase(); 
    return (
      productIdLowerCase.includes(searchLowerCase) || 
      productNameLowerCase.includes(searchLowerCase)
    );
  });
  

  const handleUpdateButtonClick = (product) => {
    setSelected(product);
    showModal();
  };

  const showModal = () => {

    setModalStyle({
      display: 'block'
    })
  }

  const closeModal = () => {
    setModalStyle({
      display: 'none'
    })
  }
  

  return (
    <>
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
        <table style={{ width: "100%", borderCollapse: "separate" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ddd", padding: "8px",backgroundColor: "green", color: "white" }}>ID</th>
              <th style={{ border: "1px solid #ddd", padding: "8px",backgroundColor: "green", color: "white"}}>Inventory Name</th>
              <th style={{ border: "1px solid #ddd", padding: "8px",backgroundColor: "green", color: "white"}}>Quantity</th>
              <th style={{ border: "1px solid #ddd", padding: "8px",backgroundColor: "green", color: "white"}}>Price</th>
              <th style={{ border: "1px solid #ddd", padding: "8px",backgroundColor: "green", color: "white"}}>Use Quantity</th>
              <th style={{ border: "1px solid #ddd", padding: "8px",backgroundColor: "green", color: "white"}}>Date & Time</th>
              <th style={{ border: "1px solid #ddd", padding: "8px",backgroundColor: "green", color: "white" }}>Action</th>
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
                      marginRight: "10px",
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

    <div className="modal-Anoj" style={modalStyle}>
      <UpdateInventory handleUpdate={closeModal} showUpdated={() => setUpdated(prev => !prev)} selected={selected}/>
    </div>

    </>
  );
}