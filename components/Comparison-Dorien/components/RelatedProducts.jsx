import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Carousel from 'react-bootstrap/Carousel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import styles from './price.module.css';
import Comparison_Modal from './Comparison-Modal';
import Stars from '../../Reviews-Jim/components/Stars';
import { arrayOf } from 'prop-types';

const RelatedProducts = ({
  products, images, style, ratings, setProductId, productName, productRating, productStyle, setProducts, setProductImg, setProductStyle,
}) => {
// in order to make multiple slides in carousel
  const arrayOfArrayProducts = [];
  let arrayOfProducts = [];
  const copyOfProducts = products.slice();
  const starStyle = {
    display: 'inline',
  };
  
  if (products.length === 0) {
    products = [
      {
        data: {
          id: 18079,
          name: 'null',
          category: null,
        },
      },
      {
        data: {
          id: 18079,
          name: 'null',
          category: null,
        },
      },
      {
        data: {
          id: 18079,
          name: 'null',
          category: null,
        },
      },
      {
        data: {
          id: 18079,
          name: 'null',
          category: null,
        },
      },
    ];
  }
  for (let i = 0; i <= Math.ceil(copyOfProducts.length / 4); i++) {
    arrayOfProducts = copyOfProducts.splice(0, 4);
    if (arrayOfProducts.length < 4) {
      while (arrayOfProducts.length < 4) {
        arrayOfProducts.push({
          data: {
            id: 18079,
            name: 'Out of stock',
            category: 'null',
          },
        });
      }
      style['18079'] = { style_id: 96893, name: 'Black Lenses & Black Frame', original_price: '69.00}' };
      images['18079'] = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22263%22%20height%3D%22160%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20263%20160%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_177e4e6d2c3%20text%20%7B%20fill%3A%23999%3Bfont-weight%3Anormal%3Bfont-family%3A-apple-system%2CBlinkMacSystemFont%2C%26quot%3BSegoe%20UI%26quot%3B%2CRoboto%2C%26quot%3BHelvetica%20Neue%26quot%3B%2CArial%2C%26quot%3BNoto%20Sans%26quot%3B%2C%26quot%3BLiberation%20Sans%26quot%3B%2Csans-serif%2C%26quot%3BApple%20Color%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Emoji%26quot%3B%2C%26quot%3BSegoe%20UI%20Symbol%26quot%3B%2C%26quot%3BNoto%20Color%20Emoji%26quot%3B%2C%20monospace%3Bfont-size%3A13pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_177e4e6d2c3%22%3E%3Crect%20width%3D%22263%22%20height%3D%22160%22%20fill%3D%22%23373940%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2297.25%22%20y%3D%2286.15%22%3E263x160%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E';
    }
    arrayOfArrayProducts.push(arrayOfProducts);
    arrayOfProducts = [];
  }


  const changeProduct = (itemId) => {
    setProductId(itemId);
    setProducts([]);
    setProductImg(false);
    setProductStyle(false);
  };

  return (
    <>
      Related Products
      {products
                && (
                <Carousel interval={null}>
                  {arrayOfArrayProducts.map((array, index) => (
                    <Carousel.Item key={index}>
                      <CardDeck>
                        {array.map((item, index) => (
                          <OverlayTrigger
                            placement="top"
                            delay={{ show: 250, hide: 400 }}
                            overlay={Comparison_Modal}
                            key={index}
                            popperConfig={{
                              productName,
                              relatedName: item.data.name,
                              relatedPrice: style[item.data.id.toString()].original_price,
                              style: starStyle,
                              relatedRating: ratings[item.data.id.toString()],
                              productRating,
                              productStyle,
                            }}
                          >
                            <Card key={index} className="related-products" onClick={() => changeProduct(item.data.id)}>
                              <Card.Img variant="top" className="related-image" src={images[item.data.id.toString()]} />
                              <Card.Title>{item.data.name}</Card.Title>
                              <Card.Subtitle className="mb-2 text-muted">{item.data.category}</Card.Subtitle>
                              {
                                style[item.data.id.toString()] === undefined ? (
                                  <Card.Text>
                                    <span className={styles.salePrice}>
                                      {style[item.data.id.toString()].sale_price}
                                    </span>
                                    <span className={styles.originalPrice}>
                                      {style[item.data.id.toString()].original_price}
                                    </span>
                                  </Card.Text>
                                ) : (
                                  <Card.Text>
                                    <span>{style[item.data.id.toString()].original_price}</span>
                                  </Card.Text>
                                )
                          }
                              {ratings[item.data.id.toString()] !== 'NaN' || ratings[item.data.id.toString()] !== undefined ? (
                                <>
                                  <Stars
                                    style={starStyle}
                                    rating={ratings[item.data.id.toString()]}
                                  />
                                </>
                              ) : null}
                            </Card>
                          </OverlayTrigger>
                        ))}
                      </CardDeck>
                    </Carousel.Item>
                  ))}
                </Carousel>
                )}
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
           .carousel-control-next, .carousel-control-prev {
            width: -1%;
            }
           `}
      </style>
    </>
  )
};

export default RelatedProducts;
