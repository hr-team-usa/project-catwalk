import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
// import { Container, Row, Col } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import PropTypes from 'prop-types';
import axios from 'axios';
import config from '../../../config';

const NewReviewForm = ({
  show, onHide, characteristics, productName, productId, setGetToggle,
}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [hoverText, setHoverText] = useState('');
  const [recommended, setRecommended] = useState(null);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [charObj, setCharObj] = useState({});
  // const [state, setState] = useState({});

  // const stateListener = e => {
  //   console.log(e.target.name);
  //   console.log(e.target.value);
  //   setState({ ...state, [e.target.name]: (e.target.value) });
  // };

  const handleCharInput = (e, char) => {
    // console.log(characteristics[key].id);
    // console.log(e.target.value);
    const key = characteristics[char].id;
    const val = e.target.value;
    setCharObj({ ...charObj, [key]: (Number(val)) });
  };

  const renderCharacteristics = (char) => {
    if (char === 'Size') {
      return (
        <div onChange={(e) => handleCharInput(e, char)}>
          <Form.Check inline type="radio" name="char-pick1" label="A size too small" value="1" />
          <Form.Check inline type="radio" name="char-pick1" label="½ a size too small" value="2" />
          <Form.Check inline type="radio" name="char-pick1" label="Perfect" value="3" />
          <Form.Check inline type="radio" name="char-pick1" label="½ a size too big" value="4" />
          <Form.Check inline type="radio" name="char-pick1" label="A size too wide" value="5" />
        </div>
      );
    }
    if (char === 'Width') {
      return (
        <div onChange={(e) => handleCharInput(e, char)}>
          <Form.Check inline type="radio" name="char-pick2" label="Too narrow" value="1" />
          <Form.Check inline type="radio" name="char-pick2" label="Slightly narrow" value="2" />
          <Form.Check inline type="radio" name="char-pick2" label="Perfect" value="3" />
          <Form.Check inline type="radio" name="char-pick2" label="Slightly wide" value="4" />
          <Form.Check inline type="radio" name="char-pick2" label="Too wide" value="5" />
        </div>
      );
    }
    if (char === 'Comfort') {
      return (
        <div onChange={(e) => handleCharInput(e, char)}>
          <Form.Check inline type="radio" name="char-pick3" label="Uncomfortable" value="1" />
          <Form.Check inline type="radio" name="char-pick3" label="Slightly comfortable" value="2" />
          <Form.Check inline type="radio" name="char-pick3" label="Ok" value="3" />
          <Form.Check inline type="radio" name="char-pick3" label="Comfortable" value="4" />
          <Form.Check inline type="radio" name="char-pick3" label="Perfect" value="5" />
        </div>
      );
    }
    if (char === 'Quality') {
      return (
        <div onChange={(e) => handleCharInput(e, char)}>
          <Form.Check inline type="radio" name="char-pick4" label="Poor" value="1" />
          <Form.Check inline type="radio" name="char-pick4" label="Below average" value="2" />
          <Form.Check inline type="radio" name="char-pick4" label="What I expected" value="3" />
          <Form.Check inline type="radio" name="char-pick4" label="Pretty great" value="4" />
          <Form.Check inline type="radio" name="char-pick4" label="Perfect" value="5" />
        </div>
      );
    }
    if (char === 'Length') {
      return (
        <div onChange={(e) => handleCharInput(e, char)}>
          <Form.Check inline type="radio" name="char-pick5" label="Runs short" value="1" />
          <Form.Check inline type="radio" name="char-pick5" label="Runs slightly short" value="2" />
          <Form.Check inline type="radio" name="char-pick5" label="Perfect" value="3" />
          <Form.Check inline type="radio" name="char-pick5" label="Runs slightly long" value="4" />
          <Form.Check inline type="radio" name="char-pick5" label="Runs too long" value="5" />
        </div>
      );
    }
    if (char === 'Fit') {
      return (
        <div onChange={(e) => handleCharInput(e, char)}>
          <Form.Check inline type="radio" name="char-pick6" label="Runs tight" value="1" />
          <Form.Check inline type="radio" name="char-pick6" label="Runs slightly tight" value="2" />
          <Form.Check inline type="radio" name="char-pick6" label="Perfect" value="3" />
          <Form.Check inline type="radio" name="char-pick6" label="Runs slightly loose" value="4" />
          <Form.Check inline type="radio" name="char-pick6" label="Runs loose" value="5" />
        </div>
      );
    }
  };

  const ratingPhrase = (num) => {
    switch (num) {
      case 0 || -1:
        setHoverText('');
        break;
      case 1:
        setHoverText('Poor');
        break;
      case 2:
        setHoverText('Not very good');
        break;
      case 3:
        setHoverText('Decent');
        break;
      case 4:
        setHoverText('Pretty good');
        break;
      case 5:
        setHoverText('Excellent');
        break;
      default:
        setHoverText('');
    }
  };

  useEffect(() => {
    ratingPhrase(hover);
  }, [hover]);

  const validationCheck = () => {
    const required = [];
    if (rating === 0) {
      required.push('product rating');
    }
    if (recommended === null) {
      required.push('product recommendation');
    }
    if (Object.keys(charObj).length < Object.keys(characteristics).length) {
      required.push('characteristics');
    }
    if (body.length < 50 || body.length > 1000) {
      required.push('review body');
    }
    if (nickname === '') {
      required.push('nickname');
    }
    if (email === '') {
      required.push('email address');
    }
    if (required.length) {
      let result = '\n\n';
      for (let i = 0; i < required.length; i += 1) {
        result += `${required[i]}\n`;
      }
      return result;
    }
    return null;
  };

  const sendReview = (e) => {
    e.preventDefault();
    if (!validationCheck()) {
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
          characteristics: charObj,
        },
      };

      axios(options)
        .then((res) => {
          console.log('Review Sent! ', res);
        })
        .then(() => {
          setGetToggle(true);
        })
        .then(() => {
          onHide();
        })
        .catch((err) => { console.log('POST REVIEW ERROR ', err); });
    } else {
      alert(`Please complete the required fields: ${validationCheck()}`);
    }
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
          <Form.Group>
            <Form.Label>Overall rating (required)</Form.Label>
            <br />
            <Rating
              name="product-rating"
              value={rating}
              precision={1}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
            />
            {' '}
            <span>{hoverText}</span>
          </Form.Group>
          <Form.Group>
            <Form.Label>Do you recommend this product? (required)</Form.Label>
            <Form.Check type="radio" name="recommend" label="Yes" onChange={() => setRecommended(true)} />
            <Form.Check type="radio" name="recommend" label="No" onChange={() => setRecommended(false)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Characteristics (required)</Form.Label>
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
            <Form.Control type="" placeholder="Example: Best purchase ever!" maxLength="60" onChange={(e) => setSummary(e.target.value)} />
            <Form.Text>
              {summary.length}
              /60 characters max
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Review body (required)</Form.Label>
            <Form.Control type="" placeholder="Why did you like the product or not?" onChange={(e) => setBody(e.target.value)} />
            <Form.Text>
              Min 50 characters required
              {' '}
              {body.length}
              /1000
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please include a review that is at least 50 characters
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.File id="" label="Upload your photos" />
          </Form.Group>
          <Form.Group>
            <Form.Label>What is your nickname? (required)</Form.Label>
            <Form.Control type="" placeholder="Example: jackson11!" onChange={(e) => setNickname(e.target.value)} />
            <Form.Text>For privacy reasons, do not use your full name or email address</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicEmail" required>
            <Form.Label>Your email (required)</Form.Label>
            <Form.Control type="email" placeholder="Example: jackson11@email.com" onChange={(e) => setEmail(e.target.value)} />
            <Form.Text>For authentication reasons, you will not be emailed</Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={(e) => sendReview(e)}>Submit Review</Button>
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
  setGetToggle: PropTypes.func.isRequired,
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
