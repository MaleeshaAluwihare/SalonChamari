import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../css/Maleesha/Tables.css';
import skin from "../../images/Maleesha/skin-care.png";
import HairService from "./HairService.js";
import NailService from "./NailService.js";
import BridalService from "./BridalService.js";
import CostumeService from "./CostumePage.js";

export default function SkinServices(){

    const [ SkinService, setSkinService ] = useState( [] );
    const [searchTerm, setSearchTerm] = useState("");

    useEffect( () => {
        axios.get("/services/skinTreatment").then((res) => {
            setSkinService(res.data)
        }).catch((err) => {
            alert(err.message);
        });
    },[])

    return(
        <div>
            <div className="ServiceRec">
                <h2>OUR SERVICES</h2>
                <div className="serviceName">
                    <h1>Skin Care</h1>
                </div>
                <div className="ServiceCircles">
                    <Link to = {HairService} className="ServicesButton">HAIR</Link>
                    <Link to = {null} className="ServicesButton">SKIN</Link>
                    <Link to = {NailService} className="ServicesButton">NAIL</Link>
                    <Link to = {BridalService} className="ServicesButton">BRIDAL</Link>
                    <Link to = {CostumeService} className="ServicesButton">Sarees & Gowns</Link>
                </div>
            </div>
            <div className="search-bar">
                <input type="text" placeholder="Search service.." onChange={event => {setSearchTerm(event.target.value)}}/><FontAwesomeIcon icon={faMagnifyingGlass} className="button" />
            </div>
            <div className = "table-container-wrapper">
                <div className = "table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Skin Treatment<img src={skin} className='Icon' alt='Icon'/></th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SkinService.length === 0 ? (
                                <tr key = "no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                SkinService.filter((val) => {
                                    if (searchTerm === "") {
                                        return true;
                                    } else{
                                        return val.itemName.toLowerCase().includes(searchTerm.toLowerCase());
                                    }
                                }).map((skinService) => (
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