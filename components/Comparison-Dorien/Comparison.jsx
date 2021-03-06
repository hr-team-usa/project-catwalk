import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../../config";
import 'bootstrap/dist/css/bootstrap.min.css';
import RelatedProducts from "./RelatedProducts";
import OutfitList from "./OutfitList";
import { Container } from "react-bootstrap";
import App from "../../pages";


const Comparison = ({productId, setProductId}) => {
  const [products, setProducts] = useState([]);
  const [productImg, setProductImg] = useState(false);
  const [productStyle, setProductStyle] = useState(false);

  const getRelatedProductsId = () => {
    let options = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${productId}/related`,
      headers: {
        'Authorization': config.TOKEN
      }
    }
    axios(options)
      .then((result) => {
        if (result.data.length !== 0) {
          getRelatedProducts(result.data);
          getRelatedImages(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getRelatedProducts = (productIds) => {
    let arr = [];
    productIds.map(product => {
      arr.push(axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${product}`, {headers: {Authorization: config.TOKEN}}))
      });
      // console.log('current Array: ', arr);
      Promise.all(arr)
      .then(results => {
        setProducts(results);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const getRelatedImages = (productIds) => { // adding product price since the price and images are from the same endpoint
    let obj = {};
    let objStyle = {};
    let arr = [];
    productIds.map(product => {
      arr.push(axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${product}/styles`, {headers: {Authorization: config.TOKEN}}))
      });
      Promise.all(arr)
      .then(results => {
        results.map((item) => {
          if (item.data.results[0].photos[0].thumbnail_url) {
            obj[item.data.product_id] = item.data.results[0].photos[0].thumbnail_url
          } else {
            obj[item.data.product_id] = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22263%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20263%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_177e4e6d2c3%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2C%26quot%3BLiberation%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_177e4e6d2c3%22%3E%3Crect%20width%3D%22263%22%20height%3D%22160%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2297.25%22%20y%3D%2286.15%22%3E263x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
          }
          objStyle[item.data.product_id] = item.data.results[0];
        })
        setProductImg(obj);
        setProductStyle(objStyle);
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    getRelatedProductsId()
  }, [productId]);

  return (
    <div>
      <Container>
      {products.length > 0 && productImg && productStyle ?
          <RelatedProducts products={products} images={productImg} style={productStyle} setProductId={setProductId} setProducts={setProducts} setProductImg={setProductImg} setProductStyle={setProductStyle}/>
          : null }
          <OutfitList />
      </Container>
    </div>
  )
};

export default Comparison;