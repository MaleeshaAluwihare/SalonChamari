import React, { useEffect, useState } from "react";
import axios from "axios";
import '../../css/chavidu/salonBookingFormCSS/style.css';

export default function StudioBookingForm() {
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [contactNumber, setPhone] = useState(""); // New phone state
   const [date, setDate] = useState("");
   const [sid, setSid] = useState(""); 
   const [StudioPackage, setPackageType] = useState(""); 
   const [StudioPackages, setStudioPackage] = useState([]);
   const [amount, setAmount] = useState(""); 
   const [photographer, setPhotographer] = useState("");
   const [phoneError, setPhoneError] = useState(false); // State to track phone number error

   function validatePhoneNumber(phoneNumber) {
      // Regular expression to match 10-digit phone number
      const phoneRegex = /^[0-9]{10}$/;
      return phoneRegex.test(phoneNumber);
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
      // Validate phone number before submitting
      if (!validatePhoneNumber(contactNumber)) {
         setPhoneError(true);
         return; // Stop submission if phone number is invalid
      }

      const newStudioBooking = {
         name,
         email,
         contactNumber, // Include phone number in the booking data
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
               setPhone(""); // Clear phone number field after booking
               setDate("");
               setSid("");
               setPackageType("");
               setAmount("");
               setPhotographer("");
               setPhoneError(false); // Reset phone number error state
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

   return (
      
      <div id="booking" className="section">
          {/* <video className="background-video" autoPlay loop muted>
            <source src="../../../images/chavidu/video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
         </video> */}
         <div className="section-center">
            <div className="container">
               <div className="row">
                  <div className="booking-form">
                     <div className="booking-bg">
                        <div className="form-header">
                           <h2>Make your reservation</h2>
                           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate laboriosam numquam at</p>
                        </div>
                     </div>
                     <form onSubmit={sendData}>
                        <div className="row">
                           <div className="col-md-6">
                              <div className="form-group">
                                 <span className="form-label">Name</span>
                                 <input className="form-control" type="text" required id="name" value={name} onChange={(e) => { setName(e.target.value) }} />
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <span className="form-label">Email</span>
                                 <input className="form-control" type="email" required id="email" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <span className="form-label">Phone</span>
                                 <input className={"form-control" + (phoneError ? " error" : "")} type="tel" required id="phone" value={contactNumber} onChange={(e) => { setPhone(e.target.value) }} />
                                 {phoneError && <p className="error-message">Please enter a valid phone number.</p>}
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <span className="form-label">Date</span>
                                 <input className="form-control" type="date" required id="date" value={date} onChange={(e) => { setDate(e.target.value) }} min={new Date().toISOString().split('T')[0]} />
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-md-6">
                              <div className="form-group">
                                 <span className="form-label">Reservation ID</span>
                                 <input className="form-control" type="text" id="sid" value={sid} />
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <span className="form-label">Amount</span>
                                 <input className="form-control" type="text" required id="amount" value={amount} readOnly />
                              </div>
                           </div>
                        </div>
                        <div className="row">
                           <div className="col-md-6">
                              <div className="form-group">
                                 <span className="form-label">Package</span>
                                 <select className="form-control" required id="StudioPackage" value={StudioPackage} onChange={(e) => { setPackageType(e.target.value) }}>
                                    <option value="">Select a package</option>
                                    {StudioPackages.map((item, index) => (
                                       <option key={index} value={item.package}>{item.package}</option>
                                    ))}
                                 </select>
                              </div>
                           </div>
                           <div className="col-md-6">
                              <div className="form-group">
                                 <span className="form-label">Photographer</span>
                                 <input className="form-control" type="text" required id="photographer" value={photographer} readOnly />
                              </div>
                           </div>
                        </div>
                        <div className="form-btn">
                           <button type="submit" className="submit-btn">Make Booking</button>
                           <button onClick={checkAvailability} className="submit-btn">Check Availability</button>
                        </div>
                     </form>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
}
