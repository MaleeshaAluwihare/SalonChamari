import React from "react";
import { Link } from "react-router-dom";
import Styles from "../../css/Maleesha/ServiceList.module.css";


export default function ServiceList() {
  return (
    <div className={Styles.ServiceRec}>
      <h2>OUR SERVICES</h2>
      <div className={Styles.ServiceCircles}>
        <Link to = '/hair-page' className={Styles.ServicesButton}>HAIR</Link>
        <Link to = '/skin-page' className={Styles.ServicesButton}>SKIN</Link>
        <Link to = '/nail-page' className={Styles.ServicesButton}>NAIL</Link>
        <Link to = '/bridal-page' className={Styles.ServicesButton}>BRIDAL</Link>
        <Link to = '/costume-page' className={Styles.ServicesButton}>Sarees & Gowns</Link>
      </div>
    </div>
  );
}
