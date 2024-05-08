import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Styles from  '../../css/Maleesha/Tables.module.css';
import bride from '../../images/Maleesha/bride.png';
import groome from '../../images/Maleesha/groom.png';
import couple from '../../images/Maleesha/couple.png';
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

    return (
        <div className={Styles.bodyContainer}>
            <div className={Styles.headercontainer}>
                <Header/>
            </div>
            <div className={Styles.ServiceRec}>
                <h2>OUR SERVICES</h2>
                <div className={Styles.serviceName}>
                    <h1>Bridal</h1>
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
                                <th scope="col">Bridal Service<img src={couple} className={Styles.Icon} alt='Icon'/></th>
                            </tr>
                        </thead>
                        <tbody>
                            <td> Please contact +94 71 853 4870 for more details </td>
                        </tbody>
                    </table>
                </div>
                <div className={Styles.tablecontainer}>
                    <table className={Styles.table}>
                        <thead>
                            <tr>
                                <th scope="col">Bride Service<img src={bride} className={Styles.Icon} alt='Icon'/></th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {BrideServices.length === 0 ? (
                                <tr key="no data">
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
                <div className={Styles.tablecontainer}>
                    <table className={Styles.table}>
                        <thead>
                            <tr>
                                <th scope="col">Groom Service<img src={groome} className={Styles.Icon} alt='Icon'/></th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GroomServices.length === 0 ? (
                                <tr key="no data">
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
            <div className={Styles.footercontainer}>
                <Footer/>
            </div>
        </div>
    )
    
}