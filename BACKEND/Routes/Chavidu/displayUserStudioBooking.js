import React, { useState, useEffect } from "react";
import axios from "axios";

const UserBookings = ({ userEmail }) => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showDeleteOptions, setShowDeleteOptions] = useState(false);
    const [selectedBookingId, setSelectedBookingId] = useState(null);

    useEffect(() => {
        const fetchUserBookings = async () => {
            try {
                const response = await axios.get(`http://localhost:8070/studioBooking/bookings/${userEmail}`);
                setBookings(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching user bookings:", error);
                setLoading(false);
            }
        };

        fetchUserBookings();
    }, [userEmail]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8070/studioBooking/delete/${id}`);
            // Remove the deleted booking from the list
            setBookings(bookings.filter(booking => booking._id !== id));
        } catch (error) {
            console.error("Error deleting booking:", error);
            // Handle error
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>Studio Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <ul>
                    {bookings.map((booking) => (
                        <li key={booking._id}>
                            <p>Name: {booking.name}</p>
                            <p>Date: {booking.date}</p>
                            {showDeleteOptions && selectedBookingId === booking._id && (
                                <button onClick={() => handleDelete(booking._id)}>Delete</button>
                            )}
                            <button onClick={() => {
                                setShowDeleteOptions(!showDeleteOptions);
                                setSelectedBookingId(booking._id);
                            }}>Toggle Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserBookings;
