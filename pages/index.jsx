import React, { useState, useRef } from 'react';
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import ProductDescription from '../components/Description-Scott/ProductDescription';
import Comparison from '../components/Comparison-Dorien/Comparison';
import QAs from '../components/QAs-Malcolm/QAs';
import Reviews from '../components/Reviews-Jim/Reviews';

const App = () => {
  const [productId, setProductId] = useState(18078);
  const [productName, setProductName] = useState('Camo Onesie');
  const [productRating, setProductRating] = useState(null);
  const [currentProductData, setCurrentProductData] = useState(null);
  const [currentStyleData, setCurrentStyleData] = useState(null);
  const [cart, setCart] = useState([]);

  const reviewsRef = useRef();

  return (
    <Container>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">
          😎 NEXT Level Made in USA
        </Navbar.Brand>
        <NavDropdown title="Cart" id="basic-nav-dropdown">
          {cart.length > 0 ? cart.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <NavDropdown.Item key={index}>
              {`${item.name}`}
              (
              {`${item.size}`}
              ) x
              {`${item.quantity}`}
            </NavDropdown.Item>
          ))
            : <NavDropdown.Item>Nothing in Cart</NavDropdown.Item>}
        </NavDropdown>
      </Navbar>
      <div className="App">
        <ProductDescription
          productId={productId}
          productRating={productRating}
          reviewsRef={reviewsRef}
          setProductNameGlobal={setProductName}
          setCurrentProductData={setCurrentProductData}
          setCurrentStyleData={setCurrentStyleData}
          setCart={setCart}
          cart={cart}
        />
        <Comparison
          productId={productId}
          setProductId={setProductId}
          currentProductData={currentProductData}
          currentStyleData={currentStyleData}
          productRating={productRating}
        />
        <QAs
          productId={productId}
          productName={productName}
        />
        <Reviews
          productId={productId}
          reviewsRef={reviewsRef}
          setProductRating={setProductRating}
          productName={productName}
        />
      </div>
    </Container>
  );
};

export default App;
