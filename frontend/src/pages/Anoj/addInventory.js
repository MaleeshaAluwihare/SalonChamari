import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { FormControl, InputLabel, Select, MenuItem, TextField, Button, Container, Typography } from '@mui/material';

export default function AddInventory() {
  const [category, setCategory] = useState(""); 
  const [pid, setID] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  function sendData(e) {
    e.preventDefault();
    const newProduct = {
      category,
      pid,
      name,
      price,
      quantity,
    };

    axios.post('/StudioInventory/add', newProduct)
      .then(() => {
        alert("Product Added");
        navigate("/dash");
      })
      .catch((err) => {
        console.error('Error message:', err);
        alert(err);
      });
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Typography variant="h4" gutterBottom>Add Inventory</Typography>
      <form onSubmit={sendData}>
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            labelId="category-label"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="saloon">Saloon</MenuItem>
            <MenuItem value="studio">Studio</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          id="inventoryID"
          label="Inventory ID"
          placeholder="Enter inventory ID"
          onChange={(e) => setID(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          fullWidth
          id="inventoryName"
          label="Inventory Name"
          placeholder="Enter inventory name"
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          fullWidth
          type="number"
          id="quantity"
          label="Quantity"
          placeholder="Enter Quantity"
          onChange={(e) => setQuantity(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        <TextField
          fullWidth
          type="number"
          id="price"
          label="Price"
          placeholder="Enter Price"
          onChange={(e) => setPrice(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
          
        <Button variant="contained" type="submit">Submit</Button>
      </form>
    </Container>
  );
}
