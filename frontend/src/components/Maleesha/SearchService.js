import React, {useState} from "react";
import axios from "axios";

export default function ServiceDetails() {

    const [service, setService] = useState(null);
    const [itemID, setItemID] = useState("");

    const getServiceDetails = () => {
        axios.get(`/services/itemsGet/${itemID}`).then((response) => {

            setService(response.data.service);

        }).catch((err) => {
            alert(err.response.data.message);
        });
    };

    return (
        <div className="container">
            <br></br>
            <div className="container">
                <label htmlFor="itemId">Enter Item ID: </label>
                <input type="text" id="itemId" value={itemID} onChange={(e) => setItemID(e.target.value)} />
                <button onClick={getServiceDetails}>Get Details</button>
            </div>

            <br></br>

            {service && (
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Attribute</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Service Name</td>
                            <td>{service.serviceName}</td>
                        </tr>
                        <tr>
                            <td>Subcategory Name</td>
                            <td>{service.subCategoryName}</td>
                        </tr>
                        <tr>
                            <td>Item Name</td>
                            <td>{service.itemName}</td>
                        </tr>
                        <tr>
                            <td>Item Price</td>
                            <td>{service.itemPrice}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    ) 

}