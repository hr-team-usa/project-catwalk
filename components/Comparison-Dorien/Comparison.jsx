import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import 'bootstrap/dist/css/bootstrap.min.css';
import RelatedProducts from "./RelatedProducts"


const Comparison = ({productId}) => {

  const [products, setProducts] = useState([]);

 

  console.log(productId)

  const getRelatedProductsId = () => {
    let options = {
      method: 'get',
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/18201/related',
      headers: {
        'Authorization': config.TOKEN
      }
    }
    axios(options)
      .then((result) => {
       getRelatedProducts(result.data)
      })
      .catch((err) => {
        console.log(err);
      })

  }

  const getRelatedProducts = (productIds) => {
    let arr = []
    productIds.map(product => {
      let options2 = {
        method: 'get',
        url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${product}`,
        headers: {
          'Authorization': config.TOKEN
        }
      }
      axios(options2)
        .then(({ data }) => {
          console.log(data)
          arr.push(data);
        })
      })
    setProducts(arr);
  }

  // const [productImg, setProductImg] = useState({});

  useEffect(() => {
    getRelatedProductsId();
  }, [productId]);


  return (
    <div>
      Comparison Widget
      {products.length > 0 ? 
        <RelatedProducts products={products}/>
      : null }
     
    </div>
  )
};

export default Comparison;