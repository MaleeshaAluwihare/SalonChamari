import React , {useState,useEffect} from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
// import styles from  "../../css/Devinda/deleteEventPackage.module.css"

export const DeleteEventPackage = () => {

    const navigation = useNavigate()
    const [pFeatures, setPackageFeature] = useState("");
    const [pName, setPackageName] = useState("");
    const [pPrice, setPackagePrice] = useState("");
    const [ID , setID] = useState(null);

  const deleteData =()=>{
    Axios.delete('http://localhost:8070/eventPackages/delete/'+ID)
    navigation("/packageDashboard");
  }

  useEffect(() => {
    setPackageName(localStorage.getItem("pName"));
    setPackageFeature(localStorage.getItem("pFeatures"));
    setPackagePrice(localStorage.getItem("pPrice"));
    setID(localStorage.getItem("ID"));
  }, []);
  return (
    <div className="image-container">
      <div className="image-grid">
        <form onSubmit={deleteData}>

          <div className="form-group">
            <span className="form-label">Package Name:</span>
            <input className="form-control" type="text" value={pName} name="pname" onChange={(e) => setPackageName(e.target.value)}  />
          </div>

          <div className="form-group">
            <span className="form-label">Package Features:</span>
            <input className="form-control" type="text" value={pFeatures} name="pFeatures" onChange={(e) => setPackageFeature(e.target.value)} />
          </div>

          <div className="form-group">
            <span className="form-label">Package Price:</span>
            <input className="form-control" type="text" value={pPrice} name="Price" onChange={(e) => setPackagePrice(e.target.value)}/>
          </div>

          <div className="form-btn">
            <button type="submit" className="submit-btn">Delete</button>
          </div>
        </form>
      </div>
    </div>
  )
}
