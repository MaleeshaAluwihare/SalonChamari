import React, { useState } from "react";
import axios from "axios";

export default function AddService(){

    const [serviceName, setServiceName] = useState("");
    const [subCategoryName, setSubName] = useState("");
    const [itemID, setItemID] = useState("");
    const [itemName, setItemName] = useState("");
    const [itemPrice, setItemPrice] = useState("");

    function sendData(e){
        const newService = {
            serviceName,
            subCategoryName,
            itemID,
            itemName,
            itemPrice
        }

        axios.post("http://localhost:8070/service/itemsAdd",newService).then(() => {

            alert("Service Added.")

        } ).catch((err) =>{
            
            alert(err)
        })
    }
    return(
        <div className="container">
            <form onSubmit={sendData}>
                <div className="mb-3">
                    <label for="name" className="form-label">Service Name:</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter Service Name.." onChange={(e) => { setServiceName(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label for="age" className="form-label">Subcategory Name:</label>
                    <input type="text" className="form-control" id="age" placeholder="Enter Subcategory name.." onChange={(e) => { setSubName(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label for="gender" className="form-label">Item ID:</label>
                    <input type="text" className="form-control" id="gender" placeholder="Enter Item ID.." onChange={(e) => { setItemID(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label for="address" className="form-label">Item Name:</label>
                    <input type="text" className="form-control" id="age" placeholder="Enter Item Name.." onChange={(e) => { setItemName(e.target.value) }} />
                </div>
                <div className="mb-3">
                    <label for="address" className="form-label">Item Price:</label>
                    <input type="number" className="form-control" id="age" placeholder="Enter Item Price.." onChange={(e) => { setItemPrice(e.target.value) }} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

