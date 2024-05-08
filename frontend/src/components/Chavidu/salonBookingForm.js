import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../css/chavidu/salonBookingForm.module.css";
import refundPolicyPDF from '../../images/chavidu/Refund Eligibility.pdf'; 

export default function StudioBookingForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");
    const [service, setService] = useState("");
    const [amount, setAmount] = useState("");
    const [time, setTime] = useState("");
    const [salonId, setSalonId] = useState("");
    const [services, setServices] = useState([]);
    const [filteredServices, setFilteredServices] = useState([]);

    ///////////////////////////////////////////////////////////////////

    function checkAvailability(event) {
        event.preventDefault(); // Prevent form submission
        // Send a request to the backend to check availability for the specified date
        axios.get(`/SalonBooking/checkAvailability?date=${date}&time=${time}`)
             .then(response => {
                 if (response.data.available) {
                     alert(`Date ${date} and time ${time} is available!`);
                 } else {
                     alert(`Thank you for considering our services. We regret to inform you that there are currently no available bookings. Please select another date or time, or feel free to contact us for further assistance. We apologize for any inconvenience this may cause and sincerely appreciate your understanding`);
                 }
             })
             .catch(error => {
                 console.error("Error checking availability:", error);
                 alert("An error occurred while checking availability. Please try again later.");
             });            
    }

    //////////////////////////////////////////////////////////////////
    useEffect(() => {
        fetchItems();
        generateSalonId();
    }, []);

    const fetchItems = async () => {
        try {
            const response = await axios.get("/SalonBooking/items");
            setServices(response.data);
            setFilteredServices(response.data);
        } catch (error) {
            console.error("Error fetching items:", error);
        }
    };

    function generateSalonId() {
        const generatedId = "SAL-" + Math.random().toString(36).substr(2, 9);
        setSalonId(generatedId);
    }

    function sendData(event) {
        event.preventDefault(); 

        const newSalonBooking = {
            name,
            email,
            date,
            service,
            amount,
            time,
            salonId
        };

        axios.post("/SalonBooking/makebooking", newSalonBooking)
            .then(() => {
                alert("Salon booking Added");
                setName("");
                setEmail("");
                setDate("");
                setService("");
                setAmount("");
                setTime("");
                generateSalonId(); // Regenerate Salon ID after making a booking
            })
            .catch((err) => {
                alert(err);
            });
    }

    useEffect(() => {
        if (service) {
            // Find the selected service from services array
            const selectedService = services.find(item => item.itemName === service);
            if (selectedService) {
                // Update the amount with the price of the selected service
                setAmount(selectedService.itemPrice);
            }
        }
    }, [service, services]);

    const handleSearch = (event) => {
        const searchText = event.target.value.toLowerCase();
        const filtered = services.filter(item => item.itemName.toLowerCase().includes(searchText));
        setFilteredServices(filtered);
    };

    return (
        <div id="booking" className={styles.section}>
            <div className={styles.sectionCenter}>
              
                            <div className={styles.bookingBg}>
                                <div className={styles.formHeader}>
                                    <h2>Make your reservation</h2>
                                    <p>We understand that plans can change, and sometimes refunds are necessary. Please review our <a href={refundPolicyPDF} download>refund policy</a>.</p>
                                </div>
                            </div>
                            <form onSubmit={sendData}>
                                <div className={styles.row}>
                                    <div className={styles.colMd6}>
                                        <div className={styles.formGroup}>
                                            <span className={styles.formLabel}>Name</span>
                                            <input className={styles.formControl} type="text" required id="name" value={name} onChange={(e) => {setName(e.target.value)}} />
                                        </div>
                                    </div>
                                    <div className={styles.colMd6}>
                                        <div className={styles.formGroup}>
                                            <span className={styles.formLabel}>Email</span>
                                            <input className={styles.formControl} type="email" required id="email" value={email} onChange={(e) => {setEmail(e.target.value)}} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.colMd6}>
                                        <div className={styles.formGroup}>
                                            <span className={styles.formLabel}>Date</span>
                                            <input className={styles.formControl} type="date" required id="date" value={date} onChange={(e) => {setDate(e.target.value)}} />
                                        </div>
                                    </div>
                                    <div className={styles.colMd6}>
                                        <div className={styles.formGroup}>
                                            <span className={styles.formLabel}>Service</span>
                                            <input className={styles.formControl} type="text" placeholder="Search service..." onChange={handleSearch} />
                                            <select className={styles.formControl} required id="service" value={service} onChange={(e) => {
                                                setService(e.target.value);
                                                const selectedService = services.find(item => item.itemName === e.target.value);
                                                if (selectedService) {
                                                    setAmount(selectedService.itemPrice);
                                                }
                                            }}>
                                                <option value="">Select a service</option>
                                                {filteredServices.map((item, index) => (
                                                    <option key={index} value={item.itemName}>{item.itemName} - Rs.{item.itemPrice}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.row}>
                                    <div className={styles.colMd6}>
                                        <div className={styles.formGroup}>
                                            <span className={styles.formLabel}>Amount</span>
                                            <input className={styles.formControl} type="text" required id="amount" value={amount} readOnly />
                                        </div>
                                    </div>
                                    <div className={styles.colMd6}>
                                        <div className={styles.formGroup}>
                                            <span className={styles.formLabel}>Time</span>
                                            <input className={styles.formControl} type="time" required id="time" value={time} onChange={(e) => {setTime(e.target.value)}} />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.formGroup}>
                                    <span className={styles.formLabel}>Reservation ID</span>
                                    <input className={styles.formControl} type="text" readOnly id="salonId" value={salonId} />
                                </div>
                                <div className={styles.formBtn}>
                                    <button type="submit" className={styles.submitBtn}>Make Booking</button>
                                    <button onClick={checkAvailability} className={styles.submitBtn}>Check Availability</button>               
                                </div>
                            </form>
                        </div>
                    
                </div>
        
    );
}
