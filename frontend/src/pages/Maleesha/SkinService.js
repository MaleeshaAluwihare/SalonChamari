import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Maleesha/Tables.css';
import ServiceList from '../../components/Maleesha/ServiceList';


export default function SkinServices(){

    const [ SkinService, setSkinService ] = useState( [] );

    useEffect( () => {
        axios.get("/services/skinTreatment").then((res) => {
            setSkinService(res.data)
        }).catch((err) => {
            alert(err.message);
        });
    },[])

    return(
        <div>
            <ServiceList/>
            <div className = "table-container-wrapper">
                <div className = "table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Skin Treatment</th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SkinService.length === 0 ? (
                                <tr key = "no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                SkinService.map((skinService) => (
                                        <tr key={skinService.id}>
                                            <td>{skinService.itemName}</td>
                                            <td>{skinService.itemPrice}</td>
                                        </tr>
                                    ))
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}