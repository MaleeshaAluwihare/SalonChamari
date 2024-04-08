import axios from "axios";
import React, { useEffect, useState } from "react";

export default function AccessoriesImagePage(){

    
    const [allImage,setAllImage] = useState(null);

    useEffect(() => {
        getImages();
    },[]);

    const getImages = async() => {
        const result = axios.get("/imageUpload/fetch");
        console.log(result);
        setAllImage((await result).data.data);
    };



    return(
        <div className='mainContainer'>
            <div className='brideContainer'>
                <h2>Bride Costumes</h2>
                <hr></hr>
            </div>
            <div className='groomContainer'>
                <h2>Groom Costumes</h2>
                <hr></hr>
            </div>
            {allImage == null?"" :
                allImage.map(data => {
                    return(
                        <img src = {require(`../../uploads/${data.image}`)}
                        height={700}
                        width={1100}/>
                    )
                })
            }

        </div>
    );
}