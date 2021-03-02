import React from 'react';
// eslint-disable-next-line object-curly-newline
import { Container, Row, Col, Image } from 'react-bootstrap';

const StyleSelector = ({ allStyles, styleInfo, setStyleInfo }) => {
  const handleClick = (i) => {
    setStyleInfo(allStyles[i]);
  };

  return (
    <div>
      <Container>
        <h5>
          Style &gt;
          {`${styleInfo.name}`}
        </h5>
        <Row>
          <Col>
            {allStyles.length > 0 ? allStyles.map((style, i) => (
              <Image
                onClick={() => handleClick(i)}
                key={style.style_id}
                src={style.photos[0].thumbnail_url}
                alt="style thumbnail"
                width="80"
                height="80"
                roundedCircle
              />
            )) : null }
          </Col>
        </Row>
      </Container>
    </div>
  );
};

// StyleSelector.propTypes = {
//   allStyles: React.PropTypes.array.isRequired,
//   styleInfo: React.PropTypes.object,
//   setStyleInfo: React.PropTypes.func,
// }

export default StyleSelector;
