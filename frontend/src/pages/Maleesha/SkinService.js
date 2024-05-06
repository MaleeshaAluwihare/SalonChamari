import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Styles from '../../css/Maleesha/Tables.module.css';
import skin from "../../images/Maleesha/skin-care.png";
import Header from './Header';
import Footer from "../../components/Maleesha/Footer";

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

    return (
        <div>
            <div className={Styles.headercontainer}>
                <Header/>
            </div>
            <div className={Styles.ServiceRec}>
                <h2>OUR SERVICES</h2>
                <div className={Styles.serviceName}>
                    <h1>Skin Care</h1>
                </div>
                <div className={Styles.ServiceCircles}>
                    <Link to='/hair-page' className={Styles.ServicesBtn}>HAIR</Link>
                    <Link to='/skin-page' className={Styles.ServicesBtn}>SKIN</Link>
                    <Link to='/nail-page' className={Styles.ServicesBtn}>NAIL</Link>
                    <Link to='/bridal-page' className={Styles.ServicesBtn}>BRIDAL</Link>
                    <Link to='/costume-page' className={Styles.ServicesBtn}>Sarees & Gowns</Link>
                </div>
            </div>
            <div className={Styles.searchbar}>
                <input type="text" placeholder="Search service.." onChange={event => {setSearchTerm(event.target.value)}}/><FontAwesomeIcon icon={faMagnifyingGlass} className={Styles.button} />
            </div>
            <div className={Styles.tablecontainerwrapper}>
                <div className={Styles.tablecontainer}>
                    <table className={Styles.table}>
                        <thead>
                            <tr>
                                <th scope="col">Skin Treatment<img src={skin} className={Styles.Icon} alt='Icon'/></th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {SkinService.length === 0 ? (
                                <tr key="no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                SkinService.filter((val) => {
                                    if (searchTerm === "") {
                                        return true;
                                    } else {
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
            <div className={Styles.footercontainer}>
                <Footer/>
            </div>
        </div>
    )
    
}