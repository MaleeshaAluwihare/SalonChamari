import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../css/Maleesha/Tables.css';

export default function HairServices(){

    const [ HairCut, setHairCut ] = useState( [] );

    useEffect(() => {

        function getHairCut(){
            axios.get("/services/hairCut").then((res) =>{
                console.log(res.data)
                setHairCut(res.data)
            }).catch((err) => {
                alert(err.message);
            })
        }
        getHairCut();
    },[])

    return (
        <div>
            <h3>Hair Cut</h3>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">HAIR CUT</th>
                            <th scope="col">Standered Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {HairCut.map((hairC) => (
                            <tr>
                                <td>{hairC.itemName}</td>
                                <td>{hairC.itemPrice}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}