import axios from "axios";
import React, { useEffect, useState } from "react";

export default function ImageForme(){

    const [image, setImage] = useState(null);
    const [allImage,setAllImage] = useState(null);

    useEffect(() => {
        getImages();
    },[]);

    const submitImage = async(e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image)

        axios.post("/imageUpload/upload",formData,{
            headers: { "Content-Type": "multipart/form-data"},
        });
    };

    const onInputChange = (e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
    }

    const getImages = async() => {
        const result = axios.get("/imageUpload/fetch");
        console.log(result);
        setAllImage((await result).data.data);
    };

    return(
        <div>
            <form onSubmit={submitImage}>
                <input type="file" accept="image/*" onChange={onInputChange}></input>
                <button type="submit">Submit</button>
            </form>
            {allImage == null?"" :
                allImage.map(data => {
                    return(
                        <img src = {require(`../../uploads/${data.image}`)}
                        height={700}
                        width={1100}/>
                    )
            })}
        </div>
    );
}