import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from '../../css/chavidu/studioBookingForm.module.css';
import refundPolicyPDF from '../../images/chavidu/Refund Eligibility.pdf'; 


export default function StudioBookingForm() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [contactNumber, setPhone] = useState("");
   const [date, setDate] = useState("");
   const [sid, setSid] = useState(""); 
   const [StudioPackage, setPackageType] = useState(""); 
   const [StudioPackages, setStudioPackage] = useState([]);
   const [amount, setAmount] = useState(""); 
   const [photographer, setPhotographer] = useState("");
   const [phoneError, setPhoneError] = useState(false);
   const [nameError, setNameError] = useState(false);

   function validatePhoneNumber(phoneNumber) {
      const phoneRegex = /^[0-9]{10}$/;
      return phoneRegex.test(phoneNumber);
   }

   function validateName(name) {
      const nameRegex = /^[a-zA-Z\s]+$/;
      return nameRegex.test(name);
   }

   function checkAvailability(event) {
      event.preventDefault();
      axios.get(`/StudioBooking/checkAvailability?date=${date}`)
           .then(response => {
               if (response.data.available) {
                   alert(`Date ${date} is available!`);
               } else {
                   alert(`Date ${date} is not available.`);
               }
           })
           .catch(error => {
               console.error("Error checking availability:", error);
               alert("An error occurred while checking availability. Please try again later.");
           });
   }

   useEffect(() => {
      fetchPackages();
      generateStudioID();
   }, []);

   const fetchPackages = async () => {
      try {
         const response = await axios.get("/StudioAdmin/packages");
         setStudioPackage(response.data);
      } catch (error) {
         console.log("Error fetching packages:", error)
      }
   };

   function generateStudioID() {
      const generatedId = "STU-" + Math.random().toString(36).substr(2, 9);
      setSid(generatedId);
   }

   function sendData(event) {
      event.preventDefault();
      if (!validatePhoneNumber(contactNumber)) {
         setPhoneError(true);
         return;
      }
      if (!validateName(name)) {
         setNameError(true);
         return;
      }

      const newStudioBooking = {
         name,
         email,
         contactNumber,
         date,
         sid,
         StudioPackage,
         amount,
         photographer
      };

      axios.post("/StudioBooking/makebooking", newStudioBooking)
           .then(() => {
               alert("Studio booking Added");
               setName("");
               setEmail("");
               setPhone("");
               setDate("");
               setSid("");
               setPackageType("");
               setAmount("");
               setPhotographer("");
               setPhoneError(false);
               setNameError(false);
           })
           .catch((err) => {
               alert(err);
           });
   }

   useEffect(() => {
      if (StudioPackage) {
         const selectedPackage = StudioPackages.find(item => item.package === StudioPackage);
         if (selectedPackage) {
            setAmount(selectedPackage.amount);
            setPhotographer(selectedPackage.photographer);
         }
      }
   }, [StudioPackage, StudioPackages]);

   const handleNameChange = (event) => {
      const newName = event.target.value;
      setName(newName);
      setNameError(!validateName(newName));
   };

   const handlePhoneChange = (event) => {
      const newPhone = event.target.value;
      setPhone(newPhone);
      setPhoneError(!validatePhoneNumber(newPhone));
   };

   return (
      <div className={styles.section}>
         <div className={styles.formHeader}>
            <h2>Make your reservation</h2>
            <p>We understand that plans can change, and sometimes refunds are necessary. Please review our <a href={refundPolicyPDF} download>refund policy</a>.</p>
         </div>
         <div className={styles.formA}>   
            <form onSubmit={sendData}>
               <div className={styles.row}>
                  <div className={styles.colMd6}>
                     <div className={styles.formGroup}>
                        <span className={styles.formLabel}>Name</span>
                        <input className={styles.formControl + (nameError ? " " + styles.error : "")} type="text" required id="name" value={name} onChange={handleNameChange} />
                        {nameError && <p className={styles.errorMessage}>Please enter a valid name without special characters.</p>}
                     </div>
                  </div>
                  <div className={styles.colMd6}>
                     <div className={styles.formGroup}>
                        <span className={styles.formLabel}>Email</span>
                        <input className={styles.formControl} type="email" required id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                     </div>
                  </div>
                  <div className={styles.colMd6}>
                     <div className={styles.formGroup}>
                        <span className={styles.formLabel}>Phone</span>
                        <input className={styles.formControl + (phoneError ? " " + styles.error : "")} type="tel" required id="phone" value={contactNumber} onChange={handlePhoneChange} />
                        {phoneError && <p className={styles.errorMessage}>Please enter a valid phone number.</p>}
                     </div>
                  </div>
                  <div className={styles.colMd6}>
                     <div className={styles.formGroup}>
                        <span className={styles.formLabel}>Date</span>
                        <input className={styles.formControl} type="date" required id="date" value={date} onChange={(e) => { setDate(e.target.value) }} min={new Date().toISOString().split('T')[0]} />
                     </div>
                  </div>
               </div>
               <div className={styles.row}>
                  <div className={styles.colMd6}>
                     <div className={styles.formGroup}>
                        <span className={styles.formLabel}>Reservation ID</span>
                        <input className={styles.formControl} type="text" id="sid" value={sid} />
                     </div>
                  </div>
                  <div className={styles.colMd6}>
                     <div className={styles.formGroup}>
                        <span className={styles.formLabel}>Amount</span>
                        <input className={styles.formControl} type="text" required id="amount" value={amount} readOnly />
                     </div>
                  </div>
               </div>
               <div className={styles.row}>
                  <div className={styles.colMd6}>
                     <div className={styles.formGroup}>
                        <span className={styles.formLabel}>Package</span>
                        <select className={styles.formControl} required id="StudioPackage" value={StudioPackage} onChange={(e) => { setPackageType(e.target.value) }}>
                           <option value="">Select a package</option>
                           {StudioPackages.map((item, index) => (
                              <option key={index} value={item.package}>{item.package}</option>
                           ))}
                        </select>
                     </div>
                  </div>
                  <div className={styles.colMd6}>
                     <div className={styles.formGroup}>
                        <span className={styles.formLabel}>Photographer</span>
                        <input className={styles.formControl} type="text" required id="photographer" value={photographer} readOnly />
                     </div>
                  </div>
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
