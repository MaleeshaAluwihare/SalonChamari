import React from 'react';
import "../../css/Yasiru/chart1.css";

const ChartComponent1 = () => {
  return (
    <div className="chart-container">
      <iframe
        className="chart-iframe"
        src="https://charts.mongodb.com/charts-project-0-pohxg/embed/dashboards?id=662704de-6f74-4ed8-8cc1-255b8b9adeab&theme=light&autoRefresh=true&maxDataAge=300&showTitleAndDesc=false&scalingWidth=fixed&scalingHeight=fixed"
        title="MongoDB Chart"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default ChartComponent1;
