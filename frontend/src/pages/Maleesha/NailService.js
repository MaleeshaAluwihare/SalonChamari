import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Styles from '../../css/Maleesha/Tables.module.css';
import nailLaq from '../../images/Maleesha/nail-polish.png';
import manic from '../../images/Maleesha/manicure.png';
import Header from './Header';
import Footer from "../../components/Maleesha/Footer.js";



export default function NailServices(){

    const [ NailManicureService, setNailManicureService ] = useState( [] );
    const [ NailLacqureService, setNailLacqureService ] = useState( [] );
    const [searchTerm, setSearchTerm] = useState("");


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

    return (
        <div className={Styles.bodyContainer}>
            <div className={Styles.headercontainer}>
                <Header/>
            </div>
            <div className={Styles.ServiceRec}>
                <h2>OUR SERVICES</h2>
                <div className={Styles.serviceName}>
                    <h1>Nail Care</h1>
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
                                <th scope="col">Nail Manicure<img src={manic} className={Styles.Icon} alt='Icon'/></th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {NailManicureService.length === 0 ? (
                                <tr key="no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                NailManicureService.filter((val) => {
                                    if (searchTerm === "") {
                                        return true;
                                    } else {
                                        return val.itemName.toLowerCase().includes(searchTerm.toLowerCase());
                                    }
                                }).map((nailManicureService) => (
                                    <tr key={nailManicureService.id}>
                                        <td>{nailManicureService.itemName}</td>
                                        <td>{nailManicureService.itemPrice}</td>
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
                                <th scope="col">Nail Lacqer<img src={nailLaq} className={Styles.Icon} alt='Icon'/></th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {NailLacqureService.length === 0 ? (
                                <tr key="no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                NailLacqureService.filter((val) => {
                                    if (searchTerm === "") {
                                        return true;
                                    } else {
                                        return val.itemName.toLowerCase().includes(searchTerm.toLowerCase());
                                    }
                                }).map((nailLacqureService) => (
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
            <div className={Styles.footercontainer}>
                <Footer/>
            </div>
        </div>
    )
    
}