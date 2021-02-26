import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
const Comparison = () => {

  const [products, setProducts] = useState([]);

  const getProducts = () => {

    let options = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products',
      headers: {
        'Authorization': config.TOKEN
      }
    }
    axios(options)
      .then((result) => {
        setProducts(result.data);
      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {
    getProducts()
  }, []);



  return (
    <div>
      Comparison Widget
      {console.log(products)}
      
      {products.map((item, index) => (<div key={index}>*{item.category}* {item.name}</div>))}
    </div>
  )
};

export default Comparison;
