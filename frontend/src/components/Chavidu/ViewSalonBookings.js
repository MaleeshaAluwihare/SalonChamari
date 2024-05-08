import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useReactToPrint } from 'react-to-print'; 
import styles from '../../css/chavidu/viewBooking.module.css';

function ViewSalonBookings() {
    const [bookings, setBookings] = useState([]);
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [searchDate, setSearchDate] = useState('');
    const [filterActive, setFilterActive] = useState(false);
    const [filterNonActive, setFilterNonActive] = useState(false);
    const componentRef = useRef(); // Create a ref for the component

    useEffect(() => {
        // Function to fetch all bookings from the backend
        function getAllBookings() {
            axios.get("http://localhost:8070/SalonBooking/salonbookings")
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
        <div className={styles.container}>
            <div className={styles.headerTable}>
                <h1>Salon Bookings</h1>
                <div className={styles.filterSection}>
                    <label htmlFor="dateFilter">Filter by Date: </label>
                    <input
                        type="date"
                        id="dateFilter"
                        value={searchDate}
                        onChange={(e) => setSearchDate(e.target.value)}
                    />
                    <button onClick={handleFilter}>Filter</button>
                </div>
                <div className={styles.checkboxSection}>
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
            <button className={styles.pdf} onClick={handlePrint}>
                Download PDF
            </button>
            <table className={styles.table} ref={componentRef}> {/* Add ref to the table */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Date</th>
                        <th>Reservation ID</th>
                        <th>Service</th>
                        <th>Amount</th>
                        <th>Time</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredBookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{booking.name}</td>
                            <td>{booking.email}</td>
                            <td>{booking.date}</td>
                            <td>{booking.salonId}</td>
                            <td>{booking.service}</td>
                            <td>{booking.amount}</td>
                            <td>{booking.time}</td>
                            <td>
                                <div className={`${styles.circle} ${isBookingActive(booking) ? styles.activeCircle : styles.nonActiveCircle}`}></div>
                                {isBookingActive(booking) ? 'Active' : 'Non-Active'}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ViewSalonBookings;
