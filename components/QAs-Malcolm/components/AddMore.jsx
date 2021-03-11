import React, { useState } from 'react';
import {
  Row, Col, Container, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import AddQuestion from './AddQuestion';

function AddMore({
  productId, productName, setCount, count,
}) {
  const [show, setShow] = useState(false);

  const handleChange = (e) => {
    if (count === '&count=4') {
      setCount('&count=100');
      e.target.innerHTML = 'LESS ANSWERED QUESTIONS';
    }
    if (count === '&count=100') {
      setCount('&count=4');
      e.target.innerHTML = 'MORE ANSWERED QUESTIONS';
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={(e) => handleChange(e)}>MORE ANSWERED QUESTIONS</Button>
        </Col>
        <Col>
          <Button id="addQBtn" onClick={() => setShow(true)}>ADD A QUESTION +</Button>
          <AddQuestion
            variant="primary"
            show={show}
            onHide={() => setShow(false)}
            productId={productId}
            productName={productName}
          />
        </Col>
      </Row>
    </Container>
  );
}

AddMore.propTypes = {
  productId: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  productName: PropTypes.string.isRequired,
  setCount: PropTypes.func.isRequired,
  count: PropTypes.string.isRequired,
};

export default AddMore;
