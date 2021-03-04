import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line object-curly-newline
import { Container, Row, Col, Image } from 'react-bootstrap';

const StyleSelector = ({ allStyles, styleInfo, setStyleInfo }) => {
  const [styles, setStyles] = useState([]);
  const handleClick = (i) => {
    setStyleInfo(allStyles[i]);
  };

  const groupByFours = () => {
    const styleGroups = [];
    let styleIndex = 0;
    while (styleIndex < allStyles.length) {
      const currentRow = [];

      for (let i = 0; i < 4; i += 1) {
        currentRow.push(allStyles[styleIndex]);
        styleIndex += 1;
        if (styleIndex === allStyles.length) {
          break;
        }
      }
      styleGroups.push(currentRow);
    }

    setStyles(styleGroups);
  };

  useEffect(() => {
    groupByFours();
  }, [allStyles]);

  return (
    <div>
      <Container>
        <h5>
          Style &gt;
          {`${styleInfo.name}`}
        </h5>
        {styles.length > 0 ? styles.map((group, j) => (
          <Row key={j}>
            <Col>
              {group.length > 0 ? group.map((style, i) => (
                <Image
                  onClick={() => handleClick(i)}
                  key={style.style_id}
                  src={style.photos[0].thumbnail_url}
                  alt="style thumbnail"
                  width="80"
                  height="80"
                  roundedCircle
                />
              )) : null}
            </Col>
          </Row>
        )) : null }
      </Container>
    </div>
  );
};

StyleSelector.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  allStyles: PropTypes.array.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  styleInfo: PropTypes.object.isRequired,
  setStyleInfo: PropTypes.func.isRequired,
};

export default StyleSelector;
