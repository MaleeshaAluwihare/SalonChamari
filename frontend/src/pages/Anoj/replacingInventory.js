import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Stack from '@mui/material/Stack';

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

  const filteredProducts = products.filter((product) => {
    if (!searchInput.trim()) return true;
    const searchLowerCase = searchInput.trim().toLowerCase();
    return product.pid.toString().includes(searchLowerCase) || product.name.toLowerCase().includes(searchLowerCase);
  });

  const handleUpdateButtonClick = () => {
    navigate("/dashboard", { state: { selectedOption: "update-stock" } });
  };

  return (
    <div>
      <div className="container">
        <h1>Inventory Report</h1>
        <div className="SearchBar">
          <TextField
            label="Enter ID or Name"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
          />
          <Button variant="contained" onClick={() => setSearchInput("")}>Clear</Button>
        </div>
        <div className="container">
          <Select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="saloon">Saloon</MenuItem>
            <MenuItem value="studio">Studio</MenuItem>
          </Select>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Inventory Name</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Use Quantity</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.pid}>
                  <TableCell>{product.pid}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.useQuantity}</TableCell>
                  <TableCell>{formatDate(product.date)}</TableCell>
                  <TableCell>
                  <Stack spacing={2} direction="row">
                    <Button variant="contained" color="success" onClick={handleUpdateButtonClick}>Update</Button>
                    <Button variant="contained" color="error" onClick={() => deleteProduct(product.pid)}>Delete</Button>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="contained" color="primary" onClick={() => navigate("/add")}>Add</Button>
        </div>
      </div>
    </div>
  );
}
