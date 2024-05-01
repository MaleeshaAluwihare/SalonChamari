import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  Button, 
  Container, 
  Typography 
} from "@mui/material";

export default function AddInventory() {
  // State variables to hold form data
  const [category, setCategory] = useState("");
  const [pid, setID] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();

  // Function to handle form submission
  const sendData = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create a new product object with form data
    const newProduct = {
      category,
      pid,
      name,
      price,
      quantity,
    };

    // Send POST request to add new product
    axios
      .post("/StudioInventory/add", newProduct)
      .then(() => {
        alert("Product Added"); // Show success message
        navigate("/"); // Redirect to home page
      })
      .catch((err) => {
        console.error("Error message:", err); // Log error message to console
        alert(err); // Show error message to user
      });
  };

  // JSX code for the component
  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Typography variant="h4" gutterBottom>
        Add Inventory
      </Typography>
      <form onSubmit={sendData}> {/* Form element with onSubmit event handler */}
        {/* Select input for category */}
        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel id="category-label">Category</InputLabel>
          <Select
            
            labelId="category-label"
            id="category"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            {/* Menu items for different categories */}
            <MenuItem value="">Select Category</MenuItem>
            <MenuItem value="saloon">Saloon</MenuItem>
            <MenuItem value="studio">Studio</MenuItem>
          </Select>
        </FormControl>

        {/* Text field for inventory ID */}
        <TextField
          fullWidth
          id="inventoryID"
          label="Inventory ID"
          placeholder="Enter inventory ID"
          required
          onChange={(e) => setID(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {/* Text field for inventory name */}
        <TextField
          fullWidth
          id="inventoryName"
          label="Inventory Name"
          placeholder="Enter inventory name"
          required
          onChange={(e) => setName(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {/* Text field for quantity */}
        <TextField
          fullWidth
          type="number"
          id="quantity"
          label="Quantity"
          placeholder="Enter Quantity"
          required
          onChange={(e) => setQuantity(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {/* Text field for price */}
        <TextField
          fullWidth
          type="number"
          id="price"
          label="Price"
          placeholder="Enter Price"
          required
          onChange={(e) => setPrice(e.target.value)}
          sx={{ marginBottom: 2 }}
        />

        {/* Submit button */}
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </form>
    </Container>
  );
}
