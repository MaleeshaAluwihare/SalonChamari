import React, { useRef } from 'react'; // Importing useRef from React
import { useReactToPrint } from "react-to-print";
import "../../css/Anoj/chart1.css"

const ChartComponent1 = () => {

  const ComponentsRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => ComponentsRef.current,
    documentTitle: "Inventory Manager Report",
    onAfterPrint: () => alert("Report Successfully Download"),
  });
  
  return (
    <div className="chart-container">
      <div className="chart-wrapper">
        <iframe
          className="chart-iframe"
          src="https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=663087bc-1415-4289-81a1-0ae907317b02&maxDataAge=3600&theme=light&autoRefresh=true"
          title="MongoDB Chart"
          scrolling="no"
          frameBorder="0"
          width="640"
          height="480"
          ref={ComponentsRef} // Add ref to the iframe
        ></iframe>
      </div>
    </div>
  );
};

export default ChartComponent1;
