import React, { useState } from "react";
import axios from "axios";

export default function InventoryDetails() {

    const [product, setProduct] = useState(null);
    const [pid, setProductId] = useState("");

    const getProductDetails = () => {
        axios.get(`/StudioInventory/display/${pid}`).then((res) => {

            setProduct(res.data.product);
            
        }).catch((err) => {
            alert("Product Not Found");
        });
    };

    return (
        <div className="container">
            <br></br>
            <div className="container">
                <label htmlFor="productId">Enter Product ID: </label>
                <input type="text" id="productId" value={pid} onChange={(e) => setProductId(e.target.value)} />
                <button onClick={getProductDetails}>Get Details</button>
            </div>

            <br></br>

            {product && (
                <table className="table">
                    <tbody>
                    <thead>
                        <tr>
                            <th scope="col">Attribute</th>
                            <th scope="col">Value</th>
                        </tr>
                    </thead>
                        <tr>
                            <td>ID</td>
                            <td>{product.pid}</td>
                        </tr>
                        <tr>
                            <td>Inventory Name</td>
                            <td>{product.name}</td>
                        </tr>
                        <tr>
                            <td>Quantity</td>
                            <td>{product.price}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>{product.quantity}</td>
                        </tr>
                    </tbody>
                </table>
            )}
        </div>
    ) 
}
