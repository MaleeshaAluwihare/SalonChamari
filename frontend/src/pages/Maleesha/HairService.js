import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Maleesha/Tables.css';
import ServiceList from '../../components/Maleesha/ServiceList';

export default function HairServices(){

    const [ HairCut, setHairCut ] = useState( [] );
    const [ HairColor, setHairColor ] = useState ( [] );
    const [ HairTreatment, setHairTreatment ] = useState ( [] );

    useEffect(() => {
        axios.get("/services/hairCut").then((res) =>{
                setHairCut(res.data)
            })
            .catch((err) => {
                alert(err.message);
            });
        
        axios.get("/services/hairColor").then((res) =>{
                setHairColor(res.data)
            })
            .catch((err) => {
                alert(err.message);
            });

        axios.get("/services/hairTreatment").then((res) =>{
                setHairTreatment(res.data)
            })
            .catch((err) => {
                alert(err.message);
            });
    },[])
    

    return (
        <div>
            <ServiceList/>
            <div className="table-container-wrapper">
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">HAIR CUT</th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HairCut.length === 0 ? (
                                <tr key = "no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                    HairCut.map((hairCut) => (
                                        <tr key={hairCut.id}>
                                            <td>{hairCut.itemName}</td>
                                            <td>{hairCut.itemPrice}</td>
                                        </tr>
                                    ))
                                )}
                        </tbody>
                    </table>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">HAIR COLOR</th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HairColor.length === 0 ? (
                                <tr key="no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                    HairColor.map((hairColor) => (
                                        <tr key={hairColor.id}>
                                            <td>{hairColor.itemName}</td>
                                            <td>{hairColor.itemPrice}</td>
                                        </tr>
                                    ))
                                )}
                        </tbody>
                    </table>
                </div>
                <div className="table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">HAIR TREATMENTS</th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HairColor.length === 0 ? (
                                <tr key="no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                    HairTreatment.map((hairTreatment) => (
                                        <tr key={hairTreatment.id}>
                                            <td>{hairTreatment.itemName}</td>
                                            <td>{hairTreatment.itemPrice}</td>
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
