import React, { useState } from "react";
import axios from "axios";

export default function AddInventory() {

const [pid, setID] = useState(0);
const [name, setName] = useState("");
const [price,setQuantity] = useState(0);
const [quantity,setPrice] = useState(0);

function sendData(e) {
  e.preventDefault();

  const newProduct = {
    pid,
    name,
    price,
    quantity
  };

  axios.post('/StudioInventory/add', newProduct)
    .then(() => {
      alert("Product Added");
    })
    .catch((err) => {
      alert(err);
    });
}
  return (
    <div class="container mt-5">
    <form onSubmit={sendData}>
  
      <div class="mb-3">
        <label for="inventoryID" class="form-label">Inventory ID</label>
        <input type="text" class="form-control" id="inventoryID" placeholder="Enter inventory ID"
          onChange={(e) => {

            setID(e.target.value);
  
          }}/>
      </div>

      <div class="mb-3">

      <label for="inventoryName" class="form-label">Inventory Name</label>
      <input type="text" class="form-control" id="inventoryName" placeholder="Enter inventory name"
      onChange={(e) => {

        setName(e.target.value);

      }}/>
      </div>

      <div class="mb-3">
        <label for="price" class="form-label">Price</label>
        <input type="number" class="form-control" id="price" placeholder="Enter Price"
          onChange={(e) => {

            setPrice(e.target.value);
  
          }}/>
      </div>

      <div class="mb-3">
        <label for="quantity" class="form-label">Quantity</label>
        <input type="number" class="form-control" id="quantity" placeholder="Enter Quantity"
          onChange={(e) => {

            setQuantity(e.target.value);
  
          }}/>
      </div>
      
      <div class="mb-3">
        <button class="btn btn-primary" type="submit">Submit</button>
      </div>
    </form>
  </div>
  )
}