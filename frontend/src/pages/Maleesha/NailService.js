import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '../../css/Maleesha/Tables.css';
import HairService from "./HairService.js";
import SkinService from "./SkinService.js";
import BridalService from "./BridalService.js";
import CostumeService from "./CostumePage.js";


export default function NailServices(){

    const [ NailManicureService, setNailManicureService ] = useState( [] );
    const [ NailLacqureService, setNailLacqureService ] = useState( [] );


    useEffect( () => {
        axios.get("/services/nailManicure").then((res) => {
            setNailManicureService(res.data)
        }).catch((err) => {
            alert(err.message);
        });

        axios.get("/services/nailLacqer").then((res) => {
            setNailLacqureService(res.data)
        }).catch((err) => {
            alert(err.message);
        });
    },[])

    return(
        <div>
            <div className="ServiceRec">
                <h2>OUR SERVICES</h2>
                <div className="serviceName">
                    <h1>Nail Care</h1>
                </div>
                <div className="ServiceCircles">
                    <Link to = {HairService} className="ServicesButton">HAIR</Link>
                    <Link to = {SkinService} className="ServicesButton">SKIN</Link>
                    <Link to = {null} className="ServicesButton">NAIL</Link>
                    <Link to = {BridalService} className="ServicesButton">BRIDAL</Link>
                    <Link to = {CostumeService} className="ServicesButton">Sarees & Gowns</Link>
                </div>
            </div>
            <div className = "table-container-wrapper">
                <div className = "table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nail Manicure</th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {NailManicureService.length === 0 ? (
                                <tr key = "no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                NailManicureService.map((nailManicureService) => (
                                        <tr key={nailManicureService.id}>
                                            <td>{nailManicureService.itemName}</td>
                                            <td>{nailManicureService.itemPrice}</td>
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
                                <th scope="col">Nail Lacqer</th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {NailLacqureService.length === 0 ? (
                                <tr key = "no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                NailLacqureService.map((nailLacqureService) => (
                                        <tr key={nailLacqureService.id}>
                                            <td>{nailLacqureService.itemName}</td>
                                            <td>{nailLacqureService.itemPrice}</td>
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