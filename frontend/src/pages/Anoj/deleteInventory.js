import React from "react";


export default function DeleteInventory() {
  return (
    <div class="container mt-5">
  <form>
    <div class="mb-3">
      <label for="inventoryName" class="form-label">Inventory Name</label>
      <input type="text" class="form-control" id="inventoryName" placeholder="Enter inventory name"/>
    </div>
    <div class="mb-3">
      <label for="inventoryID" class="form-label">Inventory ID</label>
      <input type="text" class="form-control" id="inventoryID" placeholder="Enter inventory ID"/>
    </div>
    <div class="mb-3">
      <label for="quantity" class="form-label">Quantity</label>
      <input type="number" class="form-control" id="quantity" placeholder="Enter Quantity"/>
    </div>
    <div class="mb-3">
      <label for="price" class="form-label">Price</label>
      <input type="number" class="form-control" id="price" placeholder="Enter Price"/>
    </div>
    <div class="mb-3">
      <button class="btn btn-primary" type="submit">Save Changes</button>
      <button class="btn btn-danger ms-2" type="button">Delete</button>
    </div>
  </form>
</div>
  )
}