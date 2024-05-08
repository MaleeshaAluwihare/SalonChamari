// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function SupplierOrder() {
//   const [itemId, setItemId] = useState("");
//   const [quantity, setQuantity] = useState("");
//   const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
//   const [itemType, setItemType] = useState("");
//   const [price, setPrice] = useState("");
//   const [items, setItems] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = () => {
//     let url = "/inventory-Order";
//     axios
//       .get(url)
//       .then((res) => {
//         setItems(res.data);
//         console.log(res.data);
//       })
//       .catch((err) => {
//         alert(err.message);
//       });
//   };

//   return (
//     <div>
//       <table style={{ borderCollapse: "collapse", width: "100%" }}>
//         <thead>
//           <tr>
//             <th
//               style={{
//                 border: "1px solid #ddd",
//                 padding: "8px",
//                 backgroundColor: "green",
//                 color: "white",
//               }}
//             >
//               Inventory ID
//             </th>
//             <th
//               style={{
//                 border: "1px solid #ddd",
//                 padding: "8px",
//                 backgroundColor: "green",
//                 color: "white",
//               }}
//             >
//               Quantity
//             </th>
//             <th
//               style={{
//                 border: "1px solid #ddd",
//                 padding: "8px",
//                 backgroundColor: "green",
//                 color: "white",
//               }}
//             >
//               Date
//             </th>
//             <th
//               style={{
//                 border: "1px solid #ddd",
//                 padding: "8px",
//                 backgroundColor: "green",
//                 color: "white",
//               }}
//             >
//               Item Type
//             </th>
//             <th
//               style={{
//                 border: "1px solid #ddd",
//                 padding: "8px",
//                 backgroundColor: "green",
//                 color: "white",
//               }}
//             >
//               Price
//             </th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map((item) => (
//             <tr key={item.itemId}>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 {item.itemId}
//               </td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 {item.quantity}
//               </td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 {item.date}
//               </td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 {item.itemType}
//               </td>
//               <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                 {item.itemPrice}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <button
//         style={{
//           backgroundColor: "green",
//           color: "white",
//           padding: "10px 20px",
//           border: "none",
//           borderRadius: "4px",
//           cursor: "pointer",
//           marginTop: "10px",
//         }}
//       >
//         Send
//       </button>
//     </div>
//   );
// }

// export default SupplierOrder;