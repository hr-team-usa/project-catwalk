import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Carousel from 'react-bootstrap/Carousel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import styles from './price.module.css';
import Comparison_Modal from './Comparison-Modal';
import { arrayOf } from 'prop-types';

const RelatedProducts = ({
  products, images, style, setProductId, setProducts, setProductImg, setProductStyle,
}) => {
// in order to make multiple slides in carousel
  const arrayOfArrayProducts = [];
  let arrayOfProducts = [];
  const copyOfProducts = products.slice();

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

    // debugger;
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
                            placement="right"
                            delay={{ show: 250, hide: 400 }}
                            overlay={Comparison_Modal}
                            key={index}
                          >
                            <Card key={index} className="related-products" style={{ width: '5rem' }} onClick={() => changeProduct(item.data.id)}>
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
