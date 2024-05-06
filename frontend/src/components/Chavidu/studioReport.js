import React, { useState, useEffect } from "react";
import axios from "axios";

export default function BookingReport() {
    const [reportData, setReportData] = useState([]);

    useEffect(() => {
        generateReport();
    }, []);

    const generateReport = async () => {
        try {
            const response = await axios.get("/StudioBooking/studiobookings");
            const bookings = response.data;

            // Count the number of bookings for each package
            const packageCounts = {};
            bookings.forEach(booking => {
                const packageName = booking.StudioPackage;
                if (packageCounts[packageName]) {
                    packageCounts[packageName]++;
                } else {
                    packageCounts[packageName] = 1;
                }
            });

            // Convert packageCounts object to an array of objects
            const report = Object.entries(packageCounts).map(([packageName, count]) => ({
                packageName,
                count
            }));

            // Sort the report by the number of bookings in descending order
            report.sort((a, b) => b.count - a.count);

            setReportData(report);
        } catch (error) {
            console.error("Error generating report:", error);
        }
    };

    const printReport = () => {
        window.print();
    };

    return (
        <div>
            <h2>Booking Report</h2>
            {reportData.length > 0 ? (
                <div>
                    <button onClick={printReport}>Print Report</button>
                    <ul>
                        {reportData.map((item, index) => (
                            <li key={index}>
                                Package: {item.packageName}, Bookings: {item.count}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
