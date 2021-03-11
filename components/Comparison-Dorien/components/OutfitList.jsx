import React, { useState, useEffect } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import { CardColumns } from 'react-bootstrap';

const OutfitList = ({ products, images }) => (
  <div>
    Outfit Products
    <Carousel interval={null}>
      <Carousel.Item>
        <CardDeck className="outfit-group">
          <Card className="outfit-products">
            <Card.Img variant="top" className="add-outfit-image" src="add-to-outfit2.png" />
            <Card.ImgOverlay>
              <Card.Title className="text-center outfit-text">Add to Outfit List</Card.Title>
            </Card.ImgOverlay>
          </Card>
          <Card className="outfit-products" style={{ width: '5rem' }}>

          </Card>
          <Card className="outfit-products" style={{ width: '5rem' }}>

          </Card>
          <Card className="outfit-products" style={{ width: '5rem' }}>
            
          </Card>
        </CardDeck>
      </Carousel.Item>
    </Carousel>
    <style>
      {`   
           .outfit-products {
             box-shadow:
             inset 0 0 60px #fff, 
             inset 20px 0 80px #f0f, 
             inset -20 0 80px #0ff,
             inset 20px 0 300px #f0f,
             inset -20px 0 300px #0ff,
             0 0 50 px #fff,
             -10 0 80px #f0f,
             10px 0 80 #0ff; 
             
           }
           .outfit-text {
             font-weight: bold;
             font: icon;
             font-size: x-large;
             position: relative;
             bottom: -1px;
           } 
           .carousel-control-prev {
             width: 2%;
           }
           .carousel-control-next {
             width: 2%;
           }
           .add-outfit {
            width: 243.500px;
            height: 271.992px;
            margin: auto;
          }
           .add-outfit-image {
             height: 272px;
             margin: auto;
             padding: 0px;
           }
           .outfit-products {
             margin: 10px;
             box-shadow: 0.5px 0.5px 0.5px 0.5px grey;
             border-color: grey;
           }
           .related-products-group {

           }
           `}
    </style>
  </div>
);

export default OutfitList;
