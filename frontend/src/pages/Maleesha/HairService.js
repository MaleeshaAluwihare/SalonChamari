import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import Styles from '../../css/Maleesha/Tables.module.css';
import HairIcon from '../../images/Maleesha/hair-cutting.png';
import HairC from '../../images/Maleesha/hairstyle.png';
import HairT from '../../images/Maleesha/woman.png';
import Header from './Header';
import Footer from "../../components/Maleesha/Footer";

export default function HairServices(){
    const [ HairCut, setHairCut ] = useState( [] );
    const [ HairColor, setHairColor ] = useState ( [] );
    const [ HairTreatment, setHairTreatment ] = useState ( [] );
    const [searchTerm, setSearchTerm] = useState("");

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
        <div className={Styles.bodyContainer}>
            <div className={Styles.headercontainer}>
                <Header/>
            </div>
            <div className={Styles.ServiceRec}>
                <h2>OUR SERVICES</h2>
                <div className={Styles.serviceName}>
                    <h1>Hair Care</h1>
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
                                <th scope="col">HAIR CUT<img src={HairIcon} className={Styles.Icon} alt='Icon'/></th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HairCut.length === 0 ? (
                                <tr key="no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                HairCut.filter((val) => {
                                    if (searchTerm === "") {
                                        return true;
                                    } else {
                                        return val.itemName.toLowerCase().includes(searchTerm.toLowerCase());
                                    }
                                }).map((hairCut) => (
                                    <tr key={hairCut.id}>
                                        <td>{hairCut.itemName}</td>
                                        <td>{hairCut.itemPrice}</td>
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
                                <th scope="col">HAIR COLOR<img src={HairC} className={Styles.Icon} alt='Icon'/></th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HairColor.length === 0 ? (
                                <tr key="no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                HairColor.filter((val) => {
                                    if (searchTerm === "") {
                                        return true;
                                    } else {
                                        return val.itemName.toLowerCase().includes(searchTerm.toLowerCase());
                                    }
                                }).map((hairColor) => (
                                    <tr key={hairColor.id}>
                                        <td>{hairColor.itemName}</td>
                                        <td>{hairColor.itemPrice}</td>
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
                                <th scope="col">HAIR TREATMENTS<img src={HairT} className={Styles.Icon} alt='Icon'/></th>
                                <th scope="col">Standered Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {HairColor.length === 0 ? (
                                <tr key="no data">
                                    <td colSpan="2" style={{ textAlign: "center" }}>Services will be available soon..</td>
                                </tr>
                            ) : (
                                HairTreatment.filter((val) => {
                                    if (searchTerm === "") {
                                        return true;
                                    } else {
                                        return val.itemName.toLowerCase().includes(searchTerm.toLowerCase());
                                    }
                                }).map((hairTreatment) => (
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
            <div className={Styles.footercontainer}>
                <Footer/>
            </div>  
        </div>
    )
}
