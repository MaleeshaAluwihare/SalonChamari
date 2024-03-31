import React from "react";
import { Link } from "react-router-dom";
import "../../css/Maleesha/ServiceList.css";

export default function ServiceList() {
  return (
    <div className="ServiceRec">
      <h2>OUR SERVICES</h2>
      <div className="ServiceCircles">
        <Link to="#" className="ServicesButton">HAIR</Link>
        <Link to="#" className="ServicesButton">SKIN</Link>
        <Link to="#" className="ServicesButton">NAIL</Link>
        <Link to="#" className="ServicesButton">BODY</Link>
        <Link to="#" className="ServicesButton">BRIDAL</Link>
      </div>
    </div>
  );
}
