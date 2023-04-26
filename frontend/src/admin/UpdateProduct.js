import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isAutheticated } from "../auth/helper";
import Base from "../core/Base";


import { getProduct } from "./helper/adminapicall";

const UpdateProduct = () => {
    const { user, token } = isAutheticated();
    const {productId} = useParams()
    console.log(productId)

    getProduct(productId).then(data => {
        console.log(data);
        if (data.error) {
          console.log(data.error)
        } else {
            console.log("1")
            console.log(data.name)
        }})
  return (
    <Base title="Generated certificate">
      <h1>{productId}</h1>
      
    </Base>
  );
};

export default UpdateProduct;
