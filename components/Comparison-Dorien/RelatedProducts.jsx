import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Carousel from 'react-bootstrap/Carousel';
import ProductDescription from "../Description-Scott/ProductDescription";

const RelatedProducts = ({products, images}) => {

    // console.log("products", products); // eat me!
    // console.log("images: ", images); // I was so hungry

    return (
        <div>
            Related Products
            <CardGroup className="related-products-group">
                {products.map((item, index) => (
                    <Card key={index} className="related-products" style={{ width: '5rem' }}>
                        <Card.Img variant="top" className="related-image" src={images[item.data.id.toString()]}/>
                        <Card.Title>{item.data.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{item.data.category}</Card.Subtitle>
                    </Card>))}
            </CardGroup>
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
}

export default RelatedProducts;