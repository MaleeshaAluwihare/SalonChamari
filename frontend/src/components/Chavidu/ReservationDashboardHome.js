import React from 'react';

const chartUrls = [
  // Define chart URLs here
  "https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=6627b51d-06fe-4c98-8f32-4cea8a57b292&maxDataAge=300&theme=light&autoRefresh=true",
  "https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=6627d601-e63c-4f8e-85b3-a502b632d95f&maxDataAge=300&theme=light&autoRefresh=true",
  "https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=6627dc15-3f3d-45fc-88b2-d54e184b7327&maxDataAge=1800&theme=light&autoRefresh=true",
  "https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=6627ddc4-5bbc-4aa7-8e67-c934d40be377&maxDataAge=300&theme=light&autoRefresh=true",
  "https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=6627ddc4-5bbc-4aa7-8e67-c934d40be377&maxDataAge=3600&theme=light&autoRefresh=true",
  "https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=663be1a8-5a16-4ded-8c21-b42f730bc197&maxDataAge=60&theme=light&autoRefresh=true",
  "https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=663be328-916c-4b52-8e18-c69017b63744&maxDataAge=1800&theme=light&autoRefresh=true",
  "https://charts.mongodb.com/charts-project-0-pohxg/embed/charts?id=663be42c-5d06-43a0-8c75-35b8a5cb160d&maxDataAge=3600&theme=light&autoRefresh=true"
];

const ReservationCountChart = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', // Adjust the minimum width to fit within viewport
        gap: '20px',
        justifyContent: 'center', // Center items horizontally
      }}
    >
      {chartUrls.map((url, index) => (
        <iframe
          key={index}
          style={{
            width: '100%', // Make the iframes responsive
            height: '400px', // Adjust height as needed
            border: 'none',
            borderRadius: '2px',
            boxShadow: '0 2px 10px 0 rgba(70, 76, 79, 0.2)',
          }}
          src={url}
          title={`MongoDB Chart ${index}`}
        ></iframe>
      ))}
    </div>
  );
};

export default ReservationCountChart;
