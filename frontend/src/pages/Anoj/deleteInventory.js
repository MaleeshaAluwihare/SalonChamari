import React, { useState } from "react";
import axios from "axios";

// Functional component for deleting inventory
export default function DeleteInventory() {
    // State variable to hold product ID
    const [pid, setID] = useState("");

    // Function to handle product deletion
    const deleteProduct = () => {
        // Send DELETE request to delete product by ID
        axios.delete(`/StudioInventory/delete/${pid}`).then(res => {
            // Show success message if product is deleted
            alert("Product deleted");
        }).catch(error => {
            // Show error message if deletion fails
            alert(error.response.data.status);
        });
    };

    // JSX code for rendering the component
    return (
        <div>
            <h1>Delete Inventory</h1>
            <div className="container">
                {/* Form for inputting product details */}
                <form>
                    <div className="mb-3">
                        <label htmlFor="inventoryID" className="form-label">Inventory ID</label>
                        <input type="text" className="form-control" id="inventoryID" placeholder="Enter inventory ID" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inventoryName" className="form-label">Inventory Name</label>
                        <input type="text" className="form-control" id="inventoryName" placeholder="Enter inventory name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="quantity" className="form-label">Quantity</label>
                        <input type="number" className="form-control" id="quantity" placeholder="Enter Quantity" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input type="number" className="form-control" id="price" placeholder="Enter Price" />
                    </div>
                </form>
                {/* Input field for entering product ID */}
                <label htmlFor="productId">Enter Product ID: </label>
                <input type="text" id="productId" value={pid} onChange={(e) => setID(e.target.value)} />
                {/* Button to trigger product deletion */}
                <button onClick={deleteProduct}>Delete</button>
            </div>
        </div>
    );
};
