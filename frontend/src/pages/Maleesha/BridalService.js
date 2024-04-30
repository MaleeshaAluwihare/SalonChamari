import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../../css/Maleesha/Tables.css';
import bride from '../../images/Maleesha/bride.png';
import groome from '../../images/Maleesha/groom.png';
import couple from '../../images/Maleesha/couple.png';
import HairService from "./HairService.js";
import SkinService from "./SkinService.js";
import CostumeService from "./CostumePage.js";
import NailService from "./NailService.js";
import Header from './Header';
import Footer from "../../components/Maleesha/Footer.js";


export default function BridalServices(){

    const [ BrideServices, setBrideServices ] = useState( [] );
    const [ GroomServices, setGroomServices ] = useState( [] );
    const [searchTerm, setSearchTerm] = useState("");


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
            <div className="header-container">
                <Header/>
            </div>
            <div className="ServiceRec">
                <h2>OUR SERVICES</h2>
                <div className="serviceName">
                    <h1>Bridal</h1>
                </div>
                <div className="ServiceCircles">
                    <Link to = {HairService} className="ServicesButton">HAIR</Link>
                    <Link to = {SkinService} className="ServicesButton">SKIN</Link>
                    <Link to = {NailService} className="ServicesButton">NAIL</Link>
                    <Link to = {null} className="ServicesButton">BRIDAL</Link>
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
                                <th scope="col">Bridal Service<img src={couple} className='Icon' alt='Icon'/></th>
                            </tr>
                        </thead>
                        <tbody>
                          <td> Please contact +94 71 853 4870 for more details </td>
                        </tbody>
                    </table>
                </div>
                <div className = "table-container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Bride Service<img src={bride} className='Icon' alt='Icon'/></th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BrideServices.length === 0 ? (
                                <tr key = "no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                BrideServices.filter((val) => {
                                    if (searchTerm === "") {
                                        return true;
                                    } else {
                                        return val.itemName.toLowerCase().includes(searchTerm.toLowerCase());
                                    }
                                }).map((brideServices) => (
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
                                <th scope="col">Groom Service<img src={groome} className='Icon' alt='Icon'/></th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GroomServices.length === 0 ? (
                                <tr key = "no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                GroomServices.filter((val) => {
                                    if (searchTerm === "") {
                                        return true;
                                    } else {
                                        return val.itemName.toLowerCase().includes(searchTerm.toLowerCase());
                                    }
                                }).map((groomServices) => (
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
            <div className="footer-container">
                <Footer/>
            </div>
        </div>
    )
}