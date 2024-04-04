import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Maleesha/Tables.css';
import ServiceList from '../../components/Maleesha/ServiceList';


export default function BridalServices(){

    const [ BrideServices, setBrideServices ] = useState( [] );
    const [ GroomServices, setGroomServices ] = useState( [] );


    useEffect( () => {
        axios.get("/services/bridalBride").then((res) => {
            setBrideServices(res.data)
        }).catch((err) => {
            alert(err.message);
        });

        axios.get("/services/bridalGroom").then((res) => {
            setGroomServices(res.data)
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
                                <th scope="col">Bride Service</th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BrideServices.length === 0 ? (
                                <tr key = "no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                BrideServices.map((brideServices) => (
                                        <tr key={brideServices.id}>
                                            <td>{brideServices.itemName}</td>
                                            <td>{brideServices.itemPrice}</td>
                                        </tr>
                                    ))
                                )}
                        </tbody>
                    </table>
                </div>
                <div className = "table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Groom Service</th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GroomServices.length === 0 ? (
                                <tr key = "no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                GroomServices.map((groomServices) => (
                                        <tr key={groomServices.id}>
                                            <td>{groomServices.itemName}</td>
                                            <td>{groomServices.itemPrice}</td>
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