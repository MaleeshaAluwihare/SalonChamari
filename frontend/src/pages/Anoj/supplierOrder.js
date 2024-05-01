import React, { useState } from "react";

function ItemTable() {
  // Sample data for demonstration
  const initialItems = [
    { id: 1, quantity: 10, itemType: "Type A" },
    { id: 2, quantity: 20, itemType: "Type B" },
    { id: 3, quantity: 15, itemType: "Type C" },
    // Add more items as needed
  ];

  // State to hold the items
  const [items, setItems] = useState(initialItems);

  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Quantity</th>
          <th style={{ border: "1px solid #ddd", padding: "8px" }}>Item Type</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr key={item.id}>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.id}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.quantity}</td>
            <td style={{ border: "1px solid #ddd", padding: "8px" }}>{item.itemType}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ItemTable;