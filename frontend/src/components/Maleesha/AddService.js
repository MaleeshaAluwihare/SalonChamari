import React, { useState } from "react";
import axios from "axios";

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

        axios.post("/services/itemsAdd",newService).then(response =>{
            alert(response.data.message);
        }).catch(err => {
            alert(err.response.data.message);
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

