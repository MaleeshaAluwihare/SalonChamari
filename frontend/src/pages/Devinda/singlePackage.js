import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const SinglePackage = () => {
  const [ID, setID] = useState(null);
  const [pFeatures, setPackageFeature] = useState("");
  const [pName, setPackageName] = useState("");
  const [pPrice, setPackagePrice] = useState("");

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setPackageFeature(localStorage.getItem("pFeatures"));
    setPackageName(localStorage.getItem("pName"));
    setPackagePrice(localStorage.getItem("pPrice"));
  }, []);

  return (
    <div class="container mt-5 mb-5">
      <div class="row d-flex justify-content-center">
        <div class="col-md-10">
          <div class="card">
            <div class="row">
              <div class="col-md-6">
              <img
                            onclick="change_image(this)"
                            src="https://i.imgur.com/Dhebu4F.jpg"
                            width="70"
                        />
                <div class="images p-3">
                
                  <div class="text-center p-4">
                    
                  </div>
                    <div class="text-center">
                        
                    </div>
                </div>
              </div>
              <div class="col-md-6">
                <div class="product p-4">
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="d-flex align-items-center">
                            <i class="fa fa-long-arrow-left"></i>{" "}
                            <Link to="/packages">
                                <span class="ml-1">Back</span>
                            </Link>
                        </div>
                        <i class="fa fa-shopping-cart text-muted"></i>
                    </div>

                    <div class="mt-4 mb-3">
                        {" "}
                            {/* <span class="text-uppercase text-muted brand">{type}</span> */}
                            <h5 class="text-uppercase">{pName}</h5>
                            
                            <div class="price d-flex flex-row align-items-center">
                                {/* <span class="act-price">{size}</span> */}
                            </div>
                        </div>
                  <p class="about">{pFeatures}</p>
                  <div class="sizes mt-5"></div>
                  {/* <p class="about">Number of items left: {quantity}</p> */}
                  <div class="sizes mt-5"></div>
                  <div class="cart mt-4 align-items-center">
                    {" "}
                    <Link to={"/cartPage"}>
                      <button class="btn btn-danger text-uppercase mr-2 px-4">
                        Add to cart
                      </button>
                    </Link>
                    {" "}
                    <i class="fa fa-heart text-muted"></i>{" "}
                    <i class="fa fa-share-alt text-muted"></i>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <AddProductRate/> */}
    </div>
  );
};
