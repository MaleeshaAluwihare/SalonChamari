import React, { useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';

const serviceSubcategories = {
    "Hair Care": ["Haircut", "Hair Color", "Hair Treatment"],
    "Skin Care": ["Facial | Cleanup"],
    "Nail Care": ["Manicure | Pedicure", "Nail Lacqer | Extentions"],
    "Bridal": ["Bride Dressing", "Groom Dressing", "Packages"]
  };
  

export default function AddService(){

    const [serviceName, setServiceName] = useState("");
    const [subCategoryName, setSubName] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");

    const handleServiceChange = (e) => {
        setServiceName(e.target.value);
        setSubName(""); // change subcategory when service changes
      };

    function sendData(e){
        e.preventDefault();

        const newService = {
            serviceName,
            subCategoryName,
            itemName,
            itemPrice
        };

        axios.post("/services/itemsAdd", newService).then(response => {
            Swal.fire({
                title: '<strong>Service Enlisted!</strong>',
                icon: 'success',
                html:
                    'Your new service has been <b>successfully</b> added to the catalogue. ' +
                    'It\'s time to shine and provide the best experience to your customers!',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-thumbs-up"></i> Great!',
                confirmButtonAriaLabel: 'Thumbs up, great!',
                timer: 5000
            })
        }).catch(err => {
            Swal.fire({
                title: '<strong>Uh-oh...</strong>',
                icon: 'error',
                html:
                    'We encountered an issue while adding your service. ' +
                    'But don\'t worry, it\'s not the end of the world. ' +
                    'Give it another shot or contact support if the problem persists.',
                showCloseButton: true,
                focusConfirm: false,
                confirmButtonText:
                    '<i class="fa fa-times-circle"></i> I\'ll try again',
                confirmButtonAriaLabel: 'I\'ll try again',
                timer: 7000
            })
        });
    }

    return(
        <div className="container">
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="service" className="form-label">Service Name:</label>
                        <select id="service" className="form-select" onChange={handleServiceChange}>
                            <option value="">Select Service</option>
                            {Object.keys(serviceSubcategories).map((service) => (
                                <option key={service} value={service}>{service}</option>
                            ))}
                        </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="subcategory" className="form-label">Subcategory Name:</label>
                        <select id="subcategory" className="form-select" onChange={(e) => { setSubName(e.target.value) }}>
                            <option value="">Select Subcategory</option>
                            {serviceSubcategories[serviceName] && serviceSubcategories[serviceName].map((subcategory) => (
                                <option key={subcategory} value={subcategory}>{subcategory}</option>
                            ))}
                        </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="item" className="form-label">Item Name:</label>
                    <input type="text" className="form-control" id="item" placeholder="Enter Item Name.." onChange={(e) => { setItemName(e.target.value) }} />
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Item Price:</label>
                    <input type="number" className="form-control" id="price" placeholder="Enter Item Price.." onChange={(e) => { setItemPrice(e.target.value) }} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

