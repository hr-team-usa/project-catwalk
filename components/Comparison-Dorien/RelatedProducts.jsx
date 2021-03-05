import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Carousel from 'react-bootstrap/Carousel';
import styles from './price.module.css';

const RelatedProducts = ({ products, images, style, setProductId, setProducts, setProductImg, setProductStyle}) => {

    let changeProduct = (itemId) => {
        setProductId(itemId)
        setProducts([])
        setProductImg(false)
        setProductStyle(false)
    }

    return (
        <div>
            Related Products
            {products && 
            <CardGroup className="related-products-group">
                {products.map((item, index) => (
                    <Card key={index} className="related-products" style={{ width: '5rem' }}  onClick={() => changeProduct(item.data.id)}>
                        <Card.Img variant="top" className="related-image" src={images[item.data.id.toString()]} />
                        <Card.Title>{item.data.name}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{item.data.category}</Card.Subtitle>
                        {console.log("Styles in Related: ", style)}
                        {style &&
                            style[item.data.id.toString()].sale_price ? (
                                <Card.Text>
                                    <span className={styles.salePrice}>{style[item.data.id.toString()].sale_price}</span>
                                    <span className={styles.originalPrice}>{style[item.data.id.toString()].original_price}</span> 
                                </Card.Text>
                            ) : 
                            <Card.Text>
                                <span>{style[item.data.id.toString()].original_price}</span>
                            </Card.Text>
                            
                        }
                        
                    </Card>))}
            </CardGroup>
            }
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