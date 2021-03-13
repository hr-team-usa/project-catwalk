/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import CardDeck from 'react-bootstrap/CardDeck';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { IconButton } from '@material-ui/core';
import Stars from '../../Reviews-Jim/components/Stars';

const OutfitList = ({
  productId, productName, productStyle, productRating,
}) => {
  const [outfitList, setOutfitList] = useState([]);
  const [addedOutfit, setAddedOutfit] = useState(false);
  const [removedOutfit, setRemovedOutfit] = useState(false);
  const [index, setIndex] = useState('');
  const [outfitList2, setOutfitList2] = useState([]);

  const starStyle = {
    display: 'inline',
  };

  function removeOutfit(e) {
    setIndex(e.target.closest('.related-products').getAttribute('data-key'));
    setRemovedOutfit(true);
  }

  // set localStorage
  const setLocal = (key, obj) => localStorage.setItem(key, JSON.stringify(obj));
  // localStorage.setItem(key, JSON.stringify(obj));
  // get localStorage
  const getLocal = (key) => JSON.parse(localStorage.getItem(key));
  // JSON.parse(localStorage.getItem(key));
  // remove localStorage
  const removeLocal = (key, i) => {
    const array = getLocal(key);
    array.splice(i, 1);
    localStorage.removeItem(key);
    if (array !== []) {
      setLocal(key, array);
    }
  };

  useEffect(() => {
    if (getLocal('outfitList') !== null && getLocal('outfitList').length !== 0 && outfitList.length === 0) {
      setOutfitList(getLocal('outfitList'));
    }
    if (addedOutfit) {
      const newList = outfitList;
      if (newList.length < 3) {
        const obj = {
          id: productId,
          name: productName,
          style: productStyle,
          rating: productRating,
        };
        newList.push(obj);
        setOutfitList(newList);
        setAddedOutfit(false);
        setLocal('outfitList', newList);
      } else if (newList.length === 4) {
        const newList2 = outfitList2;
        if (newList2.length < 4) {
          newList2.push({
            id: productId,
            name: productName,
            style: productStyle,
            rating: productRating,
          });
          setOutfitList2(newList2);
          setAddedOutfit(false);
        } else {
          console.log('add an error no more than 7');
        }
      }
    }
    if (removedOutfit) {
      if (index < 4) {
        const changeList = outfitList;
        changeList.splice(index, 1);
        setOutfitList(changeList);
        removeLocal('outfitList', index);
        setRemovedOutfit(false);
      }
    }
  }, [addedOutfit, removedOutfit]);

  // onClick={() => changeProduct(outfitList[0].id)}

  return (
    <div>
      Outfit Products
      <Carousel interval={null} indicators={false} id="outfit-carousel">
        <Carousel.Item id="first-list">
          <CardDeck className="outfit-group">
            <Card className="outfit-products" onClick={() => { setAddedOutfit(true); }} style={{ width: '5rem' }}>
              <Card.Img variant="top" className="add-outfit-image" src="add-to-outfit2.png" />
              <Card.ImgOverlay>
                <Card.Title className="text-center outfit-text">Add to Outfit List</Card.Title>
              </Card.ImgOverlay>
            </Card>
            {outfitList.length === 0
              ? (
                <>
                  <Card id="first-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                  <Card id="second-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                  <Card id="third-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                </>
              )
              : outfitList.length === 1
                ? (
                  <>
                    <Card key={outfitList[0].id} data-key={0} className="related-products">
                      <Card.Img variant="top" className="related-image" src={outfitList[0].style.photos[0].url} />
                      <Card.ImgOverlay className="outfit-overlay">
                        <IconButton onClick={(e) => { removeOutfit(e); }}>
                          <HighlightOffIcon />
                        </IconButton>
                      </Card.ImgOverlay>
                      <Card.Title>{outfitList[0].name}</Card.Title>
                      {
              outfitList[0].style !== undefined ? (
                <Card.Text>
                  <span className={outfitList[0].style.sale_price}>
                    {outfitList[0].style.sale_price}
                  </span>
                  <span className={outfitList[0].style.original_price}>
                    {outfitList[0].style.original_price}
                  </span>
                </Card.Text>
              ) : (
                <Card.Text>
                  <span>{outfitList[0].style.original_price}</span>
                </Card.Text>
              )
      }
                      {outfitList[0].rating !== 'NaN' || outfitList[0].rating !== undefined ? (
                        <Stars
                          style={starStyle}
                          rating={outfitList[0].rating}
                        />
                      ) : null}
                    </Card>
                    <Card id="second-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                    <Card id="third-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                  </>
                )
                : outfitList.length === 2
                  ? (
                    <>
                      {outfitList.map((item, index) => (
                        <Card key={index} data-key={index} className="related-products">
                          <Card.Img variant="top" className="related-image" src={item.style.photos[0].url} />
                          <Card.ImgOverlay className="outfit-overlay">
                            <IconButton onClick={
                              (e) => { removeOutfit(e); }
                            }
                            >
                              <HighlightOffIcon />
                            </IconButton>
                          </Card.ImgOverlay>
                          <Card.Title>{[item.name]}</Card.Title>
                          {
              item.name === undefined ? (
                <Card.Text>
                  <span className={item.style.sale_price}>
                    {item.style.sale_price}
                  </span>
                  <span className={item.style.original_price}>
                    {item.style.original_price}
                  </span>
                </Card.Text>
              ) : (
                <Card.Text>
                  <span>{item.style.original_price}</span>
                </Card.Text>
              )
      }
                          {item.rating !== 'NaN' || item.rating !== undefined ? (
                            <Stars
                              style={starStyle}
                              rating={item.rating}
                            />
                          ) : null}
                        </Card>
                      ))}
                      <Card id="third-placeholder" className="outfit-products" style={{ width: '5rem', opacity: '.1' }} />
                    </>
                  )
                  : (
                    <>
                      {outfitList.map((item, index) => (
                        <Card key={index} data-key={index} className="related-products">
                          <Card.Img variant="top" className="related-image" src={item.style.photos[0].url} />
                          <Card.ImgOverlay className="outfit-overlay">
                            <IconButton onClick={
                              (e) => { removeOutfit(e); }
                            }
                            >
                              <HighlightOffIcon />
                            </IconButton>
                          </Card.ImgOverlay>
                          <Card.Title>{[item.name]}</Card.Title>
                          {
              item.name === undefined ? (
                <Card.Text>
                  <span className={item.style.sale_price}>
                    {item.style.sale_price}
                  </span>
                  <span className={item.style.original_price}>
                    {item.style.original_price}
                  </span>
                </Card.Text>
              ) : (
                <Card.Text>
                  <span>{item.style.original_price}</span>
                </Card.Text>
              )
      }
                          {item.rating !== 'NaN' || item.rating !== undefined ? (
                            <Stars
                              style={starStyle}
                              rating={item.rating}
                            />
                          ) : null}
                        </Card>
                      ))}
                    </>
                  )}
          </CardDeck>
        </Carousel.Item>
      </Carousel>
      <style>
        {`   
            .outfit-overlay {
              display: flex;
              justify-content: flex-end;
              align-items: flex-start;
              padding:0.1rem;
            }
            .outfit-text {
               font-weight: bold;
               font: icon;
               font-size: x-large;
               position: relative;
               bottom: -1px;
             } 
             #outfit-carousel .carousel-control-prev {
               width: 2%;
             }
             #outfit-carousel .carousel-control-next {
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
};

export default OutfitList;
