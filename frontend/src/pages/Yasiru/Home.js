import React, { useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import styles from '../../css/Yasiru/ReportbuttonStyle.module.css';
import SalonLogo from '../../images/Maleesha/Logo.png';
import EmployeeAttendanceChart from '../../components/Yasiru/Donutchat';
import EmployeeAttendanceBarChart from '../../components/Yasiru/Barchart';

function Home() {
  const ComponentsRef = useRef(null);
  const chart1Ref = useRef(null); // Ref for the first chart
  const chart2Ref = useRef(null); // Ref for the second chart

  const scrollToBottom = () => {
    ComponentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const handleGenerateReport = async () => {
    const doc = new jsPDF();
    const logo = new Image();
  
    logo.src = SalonLogo;
    logo.onload = function () {
      doc.addImage(logo, 'PNG', 70, 5, 60, 40); 
  
      // Add a title to the PDF with underline
      doc.setFontSize(22);
      doc.setFont('times', 'bold');
      doc.text('Inventory Report', doc.internal.pageSize.getWidth() / 2, 55, { align: 'center' }); // Center the title
      doc.setDrawColor(0, 0, 0);
      doc.line(80, 57, 130, 57);
      doc.line(80, 58, 130, 58);
  
      // Salon address on the left side above the table
      doc.setFontSize(12);
      doc.setFont('times', 'normal');
      doc.setTextColor(100);
      doc.text('Salon Chamari\n523/7 DS Senanayake Mawatha,\nAnuradhapura', 14, 70);
  
      // Add charts to PDF
      let yOffset = 120; // Initial Y offset for charts
      html2canvas(chart1Ref.current, { scale: 2 }).then((canvas1) => { // Scale the canvas to increase chart size
        const chart1Image = canvas1.toDataURL('image/png');
        const chartWidth1 = doc.internal.pageSize.getWidth() - 40;
        const chartHeight1 = (chartWidth1 * canvas1.height) / canvas1.width;
        doc.addImage(chart1Image, 'PNG', 20, yOffset, chartWidth1, chartHeight1);
  
        yOffset += chartHeight1 + 20; // Increase Y offset for next chart
        html2canvas(chart2Ref.current, { scale: 2 }).then((canvas2) => { // Scale the canvas to increase chart size
          const chart2Image = canvas2.toDataURL('image/png');
          const chartWidth2 = doc.internal.pageSize.getWidth() - 40;
          const chartHeight2 = (chartWidth2 * canvas2.height) / canvas2.width;
          doc.addImage(chart2Image, 'PNG', 20, yOffset, chartWidth2, chartHeight2);
  
          doc.setLineWidth(1);
          doc.rect(5, 5, doc.internal.pageSize.getWidth() - 10, doc.internal.pageSize.getHeight() - 10);
          doc.setLineWidth(0.5);
          doc.rect(7, 7, doc.internal.pageSize.getWidth() - 14, doc.internal.pageSize.getHeight() - 14);
  
          // Save or open PDF
          doc.save('InventoryReport.pdf');
        });
      });
    };
  };
  
  

  return (
    <div>
      <div ref={ComponentsRef}>
        <div>
          {/* <Attendancecount/> */}
        </div>
        <div className="Component EmployeeAttendanceChart" ref={chart1Ref}>
          <EmployeeAttendanceChart />
        </div>
        <div ref={chart2Ref}>
          <EmployeeAttendanceBarChart />
        </div>
      </div>
      <div>
        <button className={styles.Reportbutton} onClick={handleGenerateReport}>
          Generate Report
        </button>
        {/* Use className from module.css */}
      </div>
    </div>
  );
}

export default Home;
