import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import config from '../../config';
// import 'bootstrap/dist/css/bootstrap.min.css';
import RelatedProducts from './components/RelatedProducts';
import OutfitList from './components/OutfitList';

const Comparison = ({ productId, setProductId, productName, productRating, currentStyleData}) => {
  const [products, setProducts] = useState([]);
  const [productImg, setProductImg] = useState(false);
  const [productStyle, setProductStyle] = useState(false);
  const [multiProductMeta, setMultiProductMeta] = useState(null);
  const [multiRating, setMultiRating] = useState(null);

  const getRelatedProductsId = () => {
    const options = {
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${productId}/related`,
      headers: {
        Authorization: config.TOKEN,
      },
    };
    axios(options)
      .then((result) => {
        if (result.data.length !== 0) {
          let arrayOfRelatedProducts = [...new Set(result.data)];
          if (arrayOfRelatedProducts.indexOf(productId) > 0) {
            arrayOfRelatedProducts.splice(arrayOfRelatedProducts.indexOf(productId), 1);
          }
          getRelatedProducts(arrayOfRelatedProducts);
          getRelatedImages(arrayOfRelatedProducts);
          getMultiProductMeta(arrayOfRelatedProducts);
        } else {
          getRelatedProducts([18079, 18080, 18085, 18084]);
          getRelatedImages([18079, 18080, 18085, 18084]);
          getMultiProductMeta([18079, 18080, 18085, 18084]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRelatedProducts = (productIds) => {
    const arr = [];
    productIds.map((product) => {
      arr.push(axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${product}`, { headers: { Authorization: config.TOKEN } }));
    });
    Promise.all(arr)
      .then((results) => {
        setProducts(results);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // adding product price since the price and images are from the same endpoint
  const getRelatedImages = (productIds) => {
    const obj = {};
    const objStyle = {};
    const arr = [];
    productIds.map((product) => {
      arr.push(axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products/${product}/styles`, { headers: { Authorization: config.TOKEN } }));
    });
    Promise.all(arr)
      .then((results) => {
        results.map((item) => {
          if (item.data.results[0].photos[0].thumbnail_url) {
            obj[item.data.product_id] = item.data.results[0].photos[0].thumbnail_url;
          } else {
            obj[item.data.product_id] = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22263%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20263%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_177e4e6d2c3%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2C%26quot%3BLiberation%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_177e4e6d2c3%22%3E%3Crect%20width%3D%22263%22%20height%3D%22160%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2297.25%22%20y%3D%2286.15%22%3E263x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
          }
          // eslint-disable-next-line prefer-destructuring
          objStyle[item.data.product_id] = item.data.results[0];
        });
        setProductImg(obj);
        setProductStyle(objStyle);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMultiProductMeta = (productIds) => {
    const obj = {};
    const arr = [];
    productIds.map((product) => {
      arr.push(axios.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews/meta?product_id=${product}`, { headers: { Authorization: config.TOKEN } }));
    });
    Promise.all(arr)
      .then((results) => {
        results.map((metaData) => {
          obj[metaData.data.product_id] = multiRatingCreator(metaData.data.ratings);
        });
        setMultiRating(obj);
      });
  };

  const multiRatingCreator = (ratingsObj) => {
    let allRatings = 0;
    let ratingCount = 0;
    let obj = {};
    const keys = Object.keys(ratingsObj);
    const values = Object.values(ratingsObj);
    for (let i = 0; i < keys.length; i += 1) {
      allRatings += Number(keys[i]) * Number(values[i]);
      ratingCount += Number(values[i]);
    }
    return (allRatings / ratingCount).toFixed(1);
  };

  useEffect(() => {
    getRelatedProductsId();
  }, [productId]);

  return (
    <div>
      <Container>
        {products.length > 0 && productImg && productStyle && multiRating
          ? (
            <RelatedProducts
              products={products}
              images={productImg}
              style={productStyle}
              ratings={multiRating}
              productName={productName}
              productRating={productRating}
              productStyle={currentStyleData}
              setProductId={setProductId}
              setProducts={setProducts}
              setProductImg={setProductImg}
              setProductStyle={setProductStyle}
            />
          )
          : null }
        <OutfitList
          productId={productId}
          productName={productName}
          productStyle={currentStyleData}
          productRating={productRating}
        />
      </Container>
    </div>
  );
};

export default Comparison;
