/* eslint-disable */
import React, {useState, useEffect} from 'react';
import ImageGallery from './ImageGallery/ImageGallery.jsx';
import ProductInfo from './ProductInfo/ProductInfo.jsx';
import axios from 'axios';
import config from '../../config';

import { Container, Row, Col } from 'react-bootstrap';

const ProductDescription = () => {
  var productId = 18078;
  var [productName, setProductName] = useState('');
  var [category, setCategory] = useState('');
  var [description, setDescription] = useState('');

  const getProduct = () => {
    const options = {
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${productId}`,
      method: 'get',
      headers: {
        Authorization: config.TOKEN,
      }
    }
    axios(options)
    .then((results)=> {
      console.log('product results.data: ', results.data);
      setProductName(results.data.name);
      setCategory(results.data.category);
      setDescription(results.data.description);
    }).catch((err) => console.error(err));
  }

  useEffect(()=> {
    getProduct();
  }, []);
  // should receive productId state as a prop from index
  return (
  <div>
    <Container>
      <Row>
        <Col>
          <ImageGallery />
        </Col>
        <Col>
          <ProductInfo productName={productName}
                       category={category}
                       description={description}/>
          <div> Style Selector will go here </div>
          <div> Add to Cart will go here </div>
        </Col>
      </Row>
    </Container>
  </div>
  )
};

export default ProductDescription;
