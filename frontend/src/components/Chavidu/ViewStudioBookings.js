import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print'; 
import '../../css/chavidu/viewBooking.css';

function ViewStudioBookings() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [filterActive, setFilterActive] = useState(false);
    const [filterNonActive, setFilterNonActive] = useState(false);
    const componentRef = useRef(); // Create a ref for the component

    useEffect(() => {
        // Function to fetch all bookings from the backend
        function getAllBookings() {
            axios.get("http://localhost:8070/StudioBooking/studiobookings")
                .then((res) => {
                    console.log(res.data);
                    setBookings(res.data);
                    setFilteredBookings(res.data);
                })
                .catch((err) => {
                    alert(err.message);
                });
        }

        // Call the function to fetch all bookings when the component mounts
        getAllBookings();
    }, []);

    // Function to determine if a booking is active or non-active
    const isBookingActive = (booking) => {
        const currentDate = new Date();
        const bookingDate = new Date(booking.date);
        return bookingDate >= currentDate;
    };

    // Function to filter bookings
    const handleFilter = () => {
        let filtered = bookings.filter((booking) => {
            const bookingDate = new Date(booking.date);
            const searchDateObj = new Date(searchDate);
            const isActive = isBookingActive(booking);
            return (
                (!filterActive || isActive) && // Check if not filtering active bookings or if booking is active
                (!filterNonActive || !isActive) && // Check if not filtering non-active bookings or if booking is non-active
                (!searchDate || bookingDate.toDateString() === searchDateObj.toDateString()) // Check if the booking date matches the search date if provided
            );
        });
        setFilteredBookings(filtered);
    };

    // Function to handle PDF generation
    const handlePrint = useReactToPrint({
        content: () => componentRef.current, // Pass the ref of the component to print
    });

    return (
        <div className="container">
            <div className="headerTable">
                <h1>Studio Bookings</h1>
                <div className="filter-section">
                    <label htmlFor="dateFilter">Filter by Date: </label>
                    <input
                        type="date"
                        id="dateFilter"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />
                    <button onClick={handleFilter}>Filter</button>
                </div>
                <div className="checkbox-section">
                    <label>
                        <input
                            type="checkbox"
                            checked={filterActive}
                            onChange={(e) => setFilterActive(e.target.checked)}
                        />
                        Active
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={filterNonActive}
                            onChange={(e) => setFilterNonActive(e.target.checked)}
                        />
                        Non-Active
                    </label>
                </div>
            </div>
            <button onClick={handlePrint}>Download PDF</button> {/* Button to PDF generation */}
            <table className="table" ref={componentRef}> {/* Add ref to the table */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Reservation ID</th>
                        <th>Package</th>
                        <th>Amount</th>
                        <th>Photographer</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking.name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.date}</td>
                            <td>{booking.sid}</td>
                            <td>{booking.StudioPackage}</td>
                            <td>{booking.amount}</td>
                            <td>{booking.photographer}</td>
                            <td>
                                <div className={`circle ${isBookingActive(booking) ? 'active-circle' : 'non-active-circle'}`}></div>
                                {isBookingActive(booking) ? 'Active' : 'Non-Active'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewStudioBookings;
