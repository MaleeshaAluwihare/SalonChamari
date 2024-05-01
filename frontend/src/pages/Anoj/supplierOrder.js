import React, { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell } from "@mui/material";

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
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>ID</TableCell>
          <TableCell>Quantity</TableCell>
          <TableCell>Item Type</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.id}</TableCell>
            <TableCell>{item.quantity}</TableCell>
            <TableCell>{item.itemType}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
 
export default ItemTable;
