/* eslint-disable */

import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
// import Image from 'react-bootstrap/Image'

import styles from './StyleSelector.module.css';

const StyleSelector = ({ allStyles, styleInfo, setStyleInfo }) => {

  useEffect(()=> console.log('allStyles: ', allStyles), []);

  return (
    <div>
      <Container>
        <h5>Style > {`${styleInfo.name}`}</h5>
        <Row>
          <Col>
            {allStyles.length > 0 ? allStyles.map((style) => (
              <Image key={style.style_id}
                     src={style.photos[0].thumbnail_url}
                     alt="style thumbnail"
                     width="80" height="80"
                     roundedCircle />
            )) : <span/> }
          </Col>
        </Row>
      </Container>
    </div>
  )

}

export default StyleSelector;
