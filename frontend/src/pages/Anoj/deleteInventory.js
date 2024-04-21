import React, { useState } from "react";
import axios from "axios";


export default function DeleteInventory() {

    const [pid,setID] = useState("");

    const deleteProduct = () => {

        axios.delete(`/StudioInventory/delete/${pid}`).then(res => {

            alert("Product deleted");

        }).catch(error => {

            alert(error.response.data.status);

        });
    };


  return (
      <div>
        <h1>Delete Inventory</h1>
      <div class="container">
        <form>
          <div class="mb-3">
            <label for="inventoryID" class="form-label">Inventory ID</label>
            <input type="text" class="form-control" id="inventoryID" placeholder="Enter inventory ID"/>
          </div>

          <div class="mb-3">

          <label for="inventoryName" class="form-label">Inventory Name</label>
          <input type="text" class="form-control" id="inventoryName" placeholder="Enter inventory name"/>
          </div>

          <div class="mb-3">
            <label for="quantity" class="form-label">Quantity</label>
            <input type="number" class="form-control" id="quantity" placeholder="Enter Quantity"/>
          </div>

          <div class="mb-3">
            <label for="price" class="form-label">Price</label>
            <input type="number" class="form-control" id="price" placeholder="Enter Price"/>
          </div>
        </form>
        <label htmlFor="productId">Enter Product ID: </label>
        <input type="text" id="productId" value={pid} onChange={(e) => setID(e.target.value)} />
        <button onClick={deleteProduct}>Delete</button>
      </div>
  </div>
  );
};