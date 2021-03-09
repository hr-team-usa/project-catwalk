import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { Container, Row, Col } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../config';

const renderCharacteristics = (char) => {
  if (char === 'Size') {
    return (
      <>
        <Form.Check inline type="radio" name="char-pick1" label="A size too small" value="1" />
        <Form.Check inline type="radio" name="char-pick1" label="½ a size too small" value="2" />
        <Form.Check inline type="radio" name="char-pick1" label="Perfect" value="3" />
        <Form.Check inline type="radio" name="char-pick1" label="½ a size too big" value="4" />
        <Form.Check inline type="radio" name="char-pick1" label="A size too wide" value="5" />
      </>
    );
  }
  if (char === 'Width') {
    return (
      <>
        <Form.Check inline type="radio" name="char-pick2" label="Too narrow" value="1" />
        <Form.Check inline type="radio" name="char-pick2" label="Slightly narrow" value="2" />
        <Form.Check inline type="radio" name="char-pick2" label="Perfect" value="3" />
        <Form.Check inline type="radio" name="char-pick2" label="Slightly wide" value="4" />
        <Form.Check inline type="radio" name="char-pick2" label="Too wide" value="5" />
      </>
    );
  }
  if (char === 'Comfort') {
    return (
      <>
        <Form.Check inline type="radio" name="char-pick3" label="Uncomfortable" value="1" />
        <Form.Check inline type="radio" name="char-pick3" label="Slightly comfortable" value="2" />
        <Form.Check inline type="radio" name="char-pick3" label="Ok" value="3" />
        <Form.Check inline type="radio" name="char-pick3" label="Comfortable" value="4" />
        <Form.Check inline type="radio" name="char-pick3" label="Perfect" value="5" />
      </>
    );
  }
  if (char === 'Quality') {
    return (
      <>
        <Form.Check inline type="radio" name="char-pick4" label="Poor" value="1" />
        <Form.Check inline type="radio" name="char-pick4" label="Below average" value="2" />
        <Form.Check inline type="radio" name="char-pick4" label="What I expected" value="3" />
        <Form.Check inline type="radio" name="char-pick4" label="Pretty great" value="4" />
        <Form.Check inline type="radio" name="char-pick4" label="Perfect" value="5" />
      </>
    );
  }
  if (char === 'Length') {
    return (
      <>
        <Form.Check inline type="radio" name="char-pick5" label="Runs short" value="1" />
        <Form.Check inline type="radio" name="char-pick5" label="Runs slightly short" value="2" />
        <Form.Check inline type="radio" name="char-pick5" label="Perfect" value="3" />
        <Form.Check inline type="radio" name="char-pick5" label="Runs slightly long" value="4" />
        <Form.Check inline type="radio" name="char-pick5" label="Runs too long" value="5" />
      </>
    );
  }
  if (char === 'Fit') {
    return (
      <>
        <Form.Check inline type="radio" name="char-pick6" label="Runs tight" value="1" />
        <Form.Check inline type="radio" name="char-pick6" label="Runs slightly tight" value="2" />
        <Form.Check inline type="radio" name="char-pick6" label="Perfect" value="3" />
        <Form.Check inline type="radio" name="char-pick6" label="Runs slightly loose" value="4" />
        <Form.Check inline type="radio" name="char-pick6" label="Runs loose" value="5" />
      </>
    );
  }
};

const NewReviewForm = ({
  show, onHide, characteristics, productName, productId,
}) => {
  const [validated, setValidated] = useState(false);
  const [rating, setRating] = useState(0);
  const [recommended, setRecommended] = useState(false);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');

  const sendReview = () => {
    const options = {
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/reviews',
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: config.TOKEN,
      },
      data: {
        product_id: productId,
        rating,
        summary,
        body,
        recommend: recommended,
        name: nickname,
        email,
        photos: [],
        characteristics: {},
      },
    };

    axios(options)
      .then((res) => {
        console.log('Review Sent! ', res);
      })
      .then(() => {
        onHide();
      })
      .catch((err) => { console.log('POST REVIEW ERROR ', options.body); });
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Write Your Review
          <br />
          About the
          {' '}
          {productName}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          Mandatory fields *
          <Form.Group>
            <Form.Label>Overall rating *</Form.Label>
            <br />
            <Rating
              name="product-rating"
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Do you recommend this product? *</Form.Label>
            <Form.Check type="radio" name="recommend" label="Yes" onChange={() => setRecommended(true)} />
            <Form.Check type="radio" name="recommend" label="No" onChange={() => setRecommended(false)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Characteristics</Form.Label>
            <br />
            {Object.keys(characteristics).map((characteristic, i) => (
              <div key={i}>
                <Form.Label>{characteristic}</Form.Label>
                <Form.Group>{renderCharacteristics(characteristic)}</Form.Group>
              </div>
            ))}
          </Form.Group>
          <Form.Group>
            <Form.Label>Review summary</Form.Label>
            <Form.Control type="" placeholder="Summary" onChange={(e) => setSummary(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Review body *</Form.Label>
            <Form.Control type="" placeholder="Body" onChange={(e) => setBody(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.File id="" label="Upload your photos" />
          </Form.Group>
          <Form.Group>
            <Form.Label>What is your nickname?</Form.Label>
            <Form.Control type="" placeholder="Nickname" onChange={(e) => setNickname(e.target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Your email</Form.Label>
            <Form.Control type="email" placeholder="Email address" onChange={(e) => setEmail(e.target.value)} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={sendReview}>Submit Review</Button>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

  );
};

NewReviewForm.propTypes = {
  show: PropTypes.bool.isRequired,
  onHide: PropTypes.func.isRequired,
  characteristics: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.number,
      value: PropTypes.string,
    }),
  ).isRequired,
  productName: PropTypes.string.isRequired,
  productId: PropTypes.number.isRequired,
};

export default NewReviewForm;

// https://react-bootstrap.github.io/components/modal/
// https://react-bootstrap.github.io/components/buttons/
// https://react-bootstrap.github.io/components/forms/
// https://react-bootstrap.github.io/components/input-group/

/*

      <>Overall rating*</>
      <>Do you recommend this product?*</>
      <>Characteristics*</>
      <>Review summary</>
      <>Review body*</>
      <>Upload your photos</>
      <>What is your nickname</>
      <>Your email</>

*/
