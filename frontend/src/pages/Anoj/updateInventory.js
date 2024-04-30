import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { TextField, Button, Typography, Container } from '@mui/material';

export default function UpdateInventory() {
  const navigate = useNavigate();
  const location = useLocation();
  const [pid, setProductID] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [useQuantity, setUseQuantity] = useState("");
  const [date, setDate] = useState("");
  const [totalUseQuantity, setTotalUseQuantity] = useState(0);

  useEffect(() => {
    const productData = location.state;
    if (productData) {
      setProductID(productData.pid);
      setName(productData.name);
      setPrice(productData.price);
      setQuantity(productData.quantity);
      setUseQuantity(productData.useQuantity);
      setDate(productData.date);
      setTotalUseQuantity(productData.useQuantity || 0);
    }
  }, [location.state]);

  const getMaxAllowedUseQuantity = () => {
    return parseInt(quantity) - totalUseQuantity;
  };

  const updateProduct = (e) => {
    e.preventDefault();
  
    const maxAllowedUseQuantity = parseInt(quantity) - totalUseQuantity;
    const updatedUseQuantity = parseInt(useQuantity) + totalUseQuantity;
    
    if (updatedUseQuantity > parseInt(quantity)) {
      alert("Use Quantity cannot exceed available Quantity");
      return; 
    }
  
    const updatedProduct = {
      name,
      price,
      quantity,
      useQuantity: updatedUseQuantity,
      date
    };
  
    axios
      .put(`/StudioInventory/update/${pid}`, updatedProduct)
      .then(() => {
        alert("Product Updated");
        navigate("/edit");
      })
      .catch((err) => {
        alert(err);
      });
  };
  

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>Update Inventory</Typography>
      <form onSubmit={updateProduct}>
        <TextField
          label="Inventory ID"
          value={pid}
          fullWidth
          disabled
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Inventory Name"
          value={name}
          fullWidth
          required
          variant="outlined"
          margin="normal"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Price"
          value={price}
          fullWidth
          required
          type="number"
          variant="outlined"
          margin="normal"
          onChange={(e) => setPrice(e.target.value)}
        />
        <TextField
          label="Quantity"
          value={quantity}
          fullWidth
          disabled
          variant="outlined"
          margin="normal"
        />
        <TextField
          label="Use Quantity"
          value={useQuantity}
          fullWidth
          required
          type="number"
          variant="outlined"
          margin="normal"
          max={getMaxAllowedUseQuantity()}
          onChange={(e) => setUseQuantity(e.target.value)}
        />
        <Typography variant="body2" color="textSecondary">
          Maximum allowed: {getMaxAllowedUseQuantity()}
        </Typography>
        <Button type="submit" variant="contained" color="primary">
          Update
        </Button>
      </form>
    </Container>
  );
}
