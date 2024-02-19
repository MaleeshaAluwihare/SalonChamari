import React, { useState } from "react";
import axios from "axios"; // Importing axios for making HTTP requests

export default function salonBookingForm() {

    // State variables to store form input values
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [gender, setGender] = useState("");
    const [address, setAddress] = useState("");

    // Function to send form data to the server
    function sendData(e) {
        e.preventDefault(); // Prevent default form submission behavior
        
        // Create a new student object with form input values
        const newStudent = {
            name,
            age,
            gender,
            address
        }

        // Send a POST request to the server to add the new student
        axios.post("http://localhost:8070/student/add", newStudent).then(() => {
            // Alert user upon successful addition of student
            alert("Student Added");
        }).catch((err) => {
            // Alert user if an error occurs during the request
            alert(err);
        })
    }

    return (
      <div className="SForm">
        <div id="booking" class="section">
          <div class="section-center">
            <div class="container">
              <div class="row">
                <div class="booking-form">
                  <div class="booking-bg">
                    <div class="form-header">
                      <h2>Make your reservation</h2>
                      <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Cupiditate laboriosam numquam at
                      </p>
                    </div>
                  </div>
                  <form>
                    <div class="col-md-6">
                      <div class="form-group">
                        <span class="form-label">Name</span>
                        <input class="form-control" type="text" required />
                      </div>
                      <div class="col-md-6">
                        <div class="form-group">
                          <span class="form-label">Email</span>
                          <input class="form-control" type="email" required />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <span class="form-label">Services</span>
                          <input class="form-control" type="text" required />
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="form-group">
                        <span class="form-label">Date</span>
                        <input class="form-control" type="date" required />
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <span class="form-label">Service ID</span>
                          <input class="form-control" type="text" required />
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <label for="services" class="form-label">
                            Services
                          </label>
                          <select id="services" class="form-control" required>
                            {/* Options will be dynamically added here  */}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6">
                        <div class="form-group">
                          <span class="form-label">Total amount</span>
                          <select class="form-control">
                            <option>payment option 1</option>
                            <option> payment option 2</option>
                            <option>payment option 3</option>
                          </select>
                          <span class="select-arrow"></span>
                        </div>
                      </div>
                    </div>

                    <div class="form-btn">
                      <button class="submit-btn">Check availability</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}
