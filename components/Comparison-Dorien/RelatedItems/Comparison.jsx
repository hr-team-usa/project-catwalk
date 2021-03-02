import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Carousel from 'react-bootstrap/Carousel';

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
      Related Products
      {products.length > 0 ? 
        <CardGroup className="related-products-group">
          {products.map((item, index) => (
            <Card key={index} className="related-products" style={{ width: '5rem' }}>
              <Card.Img variant="top" className="related-image" />
              <Card.Title>{item.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{item.category}</Card.Subtitle>

            </Card>))}

        </CardGroup>
      : null }
      <style>
        {`
          .related-image {
            height: 160px;
          }

          .related-products {
            margin: 10px;
            box-shadow: 0.5px 0.5px 0.5px 0.5px grey;
            border-color: grey;
          }
          .related-products-group {
            
          }
          `}
      </style>
    </div>
  )
};

export default Comparison;
