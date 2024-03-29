import React, { useState } from "react";
import axios from "axios";

export default function AddService(){

    const [serviceName, setServiceName] = useState("");
    const [subCategoryName, setSubName] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");

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
        <div className="container">html
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Service Name:</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Service Name.." onChange={(e) => { setServiceName(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Subcategory Name:</label>
                    <input type="text" className="form-control" id="age" placeholder="Enter Subcategory name.." onChange={(e) => { setSubName(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Item Name:</label>
                    <input type="text" className="form-control" id="age" placeholder="Enter Item Name.." onChange={(e) => { setItemName(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label htmlFor="address" className="form-label">Item Price:</label>
                    <input type="number" className="form-control" id="age" placeholder="Enter Item Price.." onChange={(e) => { setItemPrice(e.target.value) }} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

