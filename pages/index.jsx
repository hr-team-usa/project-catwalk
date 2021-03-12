import React, { useState, useRef } from 'react';
import { Container, Navbar, NavDropdown } from 'react-bootstrap';
import Brightness5Icon from '@material-ui/icons/Brightness5'; import ToggleButton from '@material-ui/lab/ToggleButton';
import Head from 'next/head';
import ProductDescription from '../components/Description-Scott/ProductDescription';
import Comparison from '../components/Comparison-Dorien/Comparison';
import QAs from '../components/QAs-Malcolm/QAs';
import Reviews from '../components/Reviews-Jim/Reviews';
import styles from './index.module.css';

const App = () => {
  const [productId, setProductId] = useState(18081);
  const [productName, setProductName] = useState('Camo Onesie');
  const [productRating, setProductRating] = useState(null);
  const [currentProductData, setCurrentProductData] = useState(null);
  const [currentStyleData, setCurrentStyleData] = useState(null);
  const [cart, setCart] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const reviewsRef = useRef();

  return (
    <>
      {isDarkMode ? (
        <style type="text/css">
          {`
          .navbar {
            border: solid;
            border-color: rgb(41, 41, 41);
            ;
          }
        .card {
          background-color: #353B40
        }
        `}
        </style>
      ) : null}
      <style type="text/css">
        {`
              #basic-nav-dropdown {
                color: #fff;
              }
              .MuiToggleButton-root {
                color: white;
                border-color: #fff;
              }
              .navbar {
                border: solid;
                border-color: rgb(41, 41, 41);
                border-width: thin;
                ;
              }
            `}
      </style>
      <Head>
        <title>NextLevel</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/united-states.png" type="image/x-icon" />
      </Head>
      <Container className={isDarkMode ? styles.darkMode : null}>
        <Navbar bg="dark" variant="dark" style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Navbar.Brand href="#home">
            😎
            <strong style={{ fontSize: '20px', fontFamily: 'Palatino', marginLeft: '10px' }}>NEXT Level</strong>
            <span style={{ fontSize: '11px', marginLeft: '20px' }}><i>Made in the USA</i></span>
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
          <ToggleButton
            value="check"
            selected={isDarkMode}
            onChange={() => setIsDarkMode(!isDarkMode)}
          >
            <Brightness5Icon id="darkModeIcon" />
          </ToggleButton>
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
            productName={productName}
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
    </>
  );
};

export default App;
