import React, { useRef, useEffect } from 'react';
import EmployeeAttendanceChart from '../../components/Yasiru/Donutchat';
import EmployeeAttendanceBarChart from '../../components/Yasiru/Barchart';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import styles from '../../css/Yasiru/ReportbuttonStyle.module.css'; // Import CSS module

function Home() {
  const ComponentsRef = useRef(null);

  const scrollToBottom = () => {
    ComponentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const generatePDF = () => {
    // Select the div containing the components
    const reportContent = ComponentsRef.current;

    // Use html2canvas to capture the content as an image
    html2canvas(reportContent).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      // Calculate aspect ratio
      const imgWidth = 210; // Width of A4 size in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Define PDF document size and orientation
      const pdf = new jsPDF('p', 'mm', 'a4'); // Default A4 size

      // Add the captured image to the PDF, adjusting size to maintain aspect ratio
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight); // A4 size: 210x297mm

      // Download the PDF
      pdf.save('report.pdf');
    });
  };

  return (
    <div>
      <div ref={ComponentsRef}>
        <div>
          <EmployeeAttendanceChart />
        </div>
        <div>
          <EmployeeAttendanceBarChart />
        </div>
      </div>
      <div>
        <button className={styles.Reportbutton} onClick={generatePDF}>Generate Report</button> {/* Use className from module.css */}
      </div>
    </div>
  );
}

export default Home;
