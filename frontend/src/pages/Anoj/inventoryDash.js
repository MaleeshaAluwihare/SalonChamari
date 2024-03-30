import React  from "react";



export default function InventoryDash() {
  return (
    <div class="container">
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
  </div>

  )
}