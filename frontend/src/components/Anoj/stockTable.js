import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import InventoryChart from "./pieChart";
import InventoryBarChart from "./Bar";
import jsPDF from "jspdf";
import "jspdf-autotable";
import html2canvas from "html2canvas";
import SalonLogo from '../../images/Maleesha/Logo.png';

export default function StockTable() {
  const [products, setProducts] = useState([]);
  const chartsRef = React.createRef();

  useEffect(() => {
    function getProducts() {
      axios
        .get("http://localhost:8070/StudioInventory/display")
        .then((res) => {
          console.log(res.data);
          setProducts(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }
    getProducts();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const handleGenerateUserActivityReport = async () => {
    const doc = new jsPDF();
    const logo = new Image();

    logo.src = SalonLogo;
    logo.onload = function() {
      doc.addImage(logo, 'PNG', 70, 5, 60, 40);

      // Add a title to the PDF with underline
      doc.setFontSize(22);
      doc.setFont('times', 'bold');
      doc.text('Inventory Report', 105, 55, { align: 'center' }); 
      doc.setDrawColor(0, 0, 0); 
      doc.line(80, 57, 130, 57);
      doc.line(80, 58, 130, 58); 

      // Salon address on the left side above the table
      doc.setFontSize(12);
      doc.setFont('times', 'normal');
      doc.setTextColor(100); 
      doc.text('Salon Chamari\n523/7 DS Senanayake Mawatha,\nAnuradhapura', 14, 70); 

      // array to hold table data
      let tableData = [];

      // Push each product as a row to the table data
      products.forEach(product => {
          tableData.push([
              product.pid,
              product.name,
              product.quantity,
              product.price,
              formatDate(product.date)
          ]);
      });

      // Generate the table
      doc.autoTable({
          head: [['ID', 'Inventory Name', 'Quantity', 'Price', 'Add Date & Time']],
          body: tableData,
          startY: 100, // Adjusted to make space for the address
          theme: 'grid',
          styles: { halign: 'center', font: 'helvetica' }
      });

      // Add charts to PDF
      html2canvas(chartsRef.current).then((canvas) => {
        const chartImage = canvas.toDataURL("image/png");
        const chartWidth = doc.internal.pageSize.getWidth() - 40;
        const chartHeight = (chartWidth * canvas.height) / canvas.width;
        doc.addImage(chartImage, "PNG", 20, doc.autoTable.previous.finalY + 20, chartWidth, chartHeight);

        doc.setLineWidth(1);
        doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10);
        doc.setLineWidth(0.5);
        doc.rect(7, 7, doc.internal.pageSize.getWidth() - 14, doc.internal.pageSize.getHeight() - 14);

        // Save or open PDF
        doc.save("InventoryReport.pdf");
      });
    };
  };

  return (
    <div>
      <div></div>
      <div>
        <h2>Inventory Report</h2>
        <table style={{ width: "100%", borderCollapse: "separate" }}>
          <thead>
            <tr style={{ backgroundColor: "green", color: "white" }}>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "green",
                  color: "white",
                  textAlign: "center",
                }}
              >
                ID
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "green",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Inventory Name
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "green",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Quantity
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "green",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Price
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  backgroundColor: "green",
                  color: "white",
                  textAlign: "center",
                }}
              >
                Add Date & Time
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.pid}>
                <td>{product.pid}</td>
                <td>{product.name}</td>
                <td>{product.quantity}</td>
                <td>{product.price}</td>
                <td>{formatDate(product.date)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div ref={chartsRef}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ marginRight: "20px" }}>
              <InventoryBarChart products={products} />
            </div>
            <div>
              <InventoryChart products={products} />
            </div>
          </div>
        </div>
      </div>
      <div></div>
      <div>
        <button
          onClick={handleGenerateUserActivityReport}
          style={{
            padding: "8px 16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          Download report
        </button>
      </div>
    </div>
  );
}