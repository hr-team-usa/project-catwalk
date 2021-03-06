import React, { useState } from 'react';
import {
  Row, Col, Container, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';
import AddQuestion from './AddQuestion';

function AddMore({ productId, productName }) {
  const [show, setShow] = useState(false);

  return (
    <Container>
      <Row>
        <Col>
          <Button>MORE ANSWERED QUESTIONS</Button>
        </Col>
        <Col>
          <Button onClick={() => setShow(true)}>ADD A QUESTION +</Button>
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
};

export default AddMore;
