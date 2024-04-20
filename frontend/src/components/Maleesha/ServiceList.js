import React from "react";
import { Link } from "react-router-dom";
import Styles from "../../css/Maleesha/ServiceList.module.css";
import HairService from "../../pages/Maleesha/HairService.js";
import SkinService from "../../pages/Maleesha/SkinService.js";
import NailService from "../../pages/Maleesha/NailService.js";
import BridalService from "../../pages/Maleesha/BridalService.js";
import CostumeService from "../../pages/Maleesha/CostumePage.js";



export default function ServiceList() {
  return (
    <div className={Styles.ServiceRec}>
      <h2>OUR SERVICES</h2>
      <div className={Styles.ServiceCircles}>
        <Link to = {HairService} className={Styles.ServicesButton}>HAIR</Link>
        <Link to = {SkinService} className={Styles.ServicesButton}>SKIN</Link>
        <Link to = {NailService} className={Styles.ServicesButton}>NAIL</Link>
        <Link to = {BridalService} className={Styles.ServicesButton}>BRIDAL</Link>
        <Link to = {CostumeService} className={Styles.ServicesButton}>Sarees & Gowns</Link>
      </div>
    </div>
  );
}
