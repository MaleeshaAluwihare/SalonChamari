import React from "react";
import { Link } from "react-router-dom";
import "../../css/Maleesha/ServiceList.css";
import HairService from "../../pages/Maleesha/HairService.js";
import SkinService from "../../pages/Maleesha/SkinService.js";
import NailService from "../../pages/Maleesha/NailService.js";
import BridalService from "../../pages/Maleesha/BridalService.js";



export default function ServiceList() {
  return (
    <div className="ServiceRec">
      <h2>OUR SERVICES</h2>
      <div className="ServiceCircles">
        <Link to = {HairService} className="ServicesButton">HAIR</Link>
        <Link to = {SkinService} className="ServicesButton">SKIN</Link>
        <Link to = {NailService} className="ServicesButton">NAIL</Link>
        <Link to = {BridalService} className="ServicesButton">BRIDAL</Link>
        <Link to = "#" className="ServicesButton">Sarees & Gowns</Link>
      </div>
    </div>
  );
}
