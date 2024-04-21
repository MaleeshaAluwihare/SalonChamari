import React from "react";
export default function SupplierOrder () {

  return(
    <div class="container">
      <h1>Re-Order Inventory Stocks</h1>
    <table class="table table-striped table-bordered table-hover">
      <thead>
        <tr>
          <th>ID</th>
          <th>Product Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Hair Dryers</td>
          <td>10</td>
          <td>Rs. 500</td>
        </tr>
      </tbody>
    </table>
    <div>
      <button class="btn btn-danger" type="button">Send</button>
    </div>
  </div>
  )
}