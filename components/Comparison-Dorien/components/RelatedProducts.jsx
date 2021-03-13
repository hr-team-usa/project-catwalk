import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import Carousel from 'react-bootstrap/Carousel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { arrayOf } from 'prop-types';
import styles from './price.module.css';
import Comparison_Modal from './Comparison-Modal';
import Stars from '../../Reviews-Jim/components/Stars';

const RelatedProducts = ({
  products, images, style, ratings, setProductId, productName, productRating, productStyle, changeProduct,
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
            category: '',

          },
        });
      }
      style['18079'] = { style_id: 96893, name: 'Black Lenses & Black Frame', original_price: '69.00' };
      images['18079'] = 'no-image-icon.png';
    }
    arrayOfArrayProducts.push(arrayOfProducts);
    arrayOfProducts = [];
  }
  console.log(products);
  return (
    <>
      <h5 style={{ marginTop: '20px' }}>Related Products</h5>
      {products.length === 4 ? (
        <Carousel interval={null} indicators={false} id="related-carousel" controls={false}>
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
                      relatedStyle: style[item.data.id.toString()],
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
      ) : (
        <Carousel interval={null} indicators={false} id="related-carousel">
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
                      relatedStyle: style[item.data.id.toString()],
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
             max-height: 100%;
             object-fit: cover;
           }
           .related-products {
             margin: 10px;
             box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
             border-color: #80808045;
             border-radius: 7px;
           }
           .related-products-group {

           }
           #related-carousel .carousel-control-next {
            width: 2%;
           }
           #related-carousel .carousel-control-prev {
            width: 2%;
           }
           .modal-dialog .modal-content {
            box-shadow: 0px 3px 5px -1px rgb(0 0 0 / 20%), 0px 6px 10px 0px rgb(0 0 0 / 14%), 0px 1px 18px 0px rgb(0 0 0 / 12%);
            border-radius: 5px;
           }
           `}
      </style>
    </>
  );
};

export default RelatedProducts;
