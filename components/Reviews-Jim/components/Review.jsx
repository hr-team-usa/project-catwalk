import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';
import Divider from '@material-ui/core/Divider';

import ImageModal from './ImageModal';

const Review = ({ review, markReview }) => {
  const [helpful, setHelpful] = useState(false);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState('');
  const [body, setBody] = useState(review.body.substring(0, 250));

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dateVal = new Date(review.date);
  const month = monthNames[dateVal.getMonth()];
  const day = dateVal.getDate();
  const year = dateVal.getFullYear();

  return (
    <Container className="review-card">
      <Row>
        <Col>
          <Rating className="star-rating" value={review.rating} precision={0.25} readOnly />
        </Col>
        <Col className="review-user-date">
          {`${review.reviewer_name}, ${month} ${day}, ${year}`}
        </Col>
      </Row>
      <Row className="review-summary">
        <Col>
          {review.summary}
        </Col>
      </Row>
      <Row className="review-body">
        {(review.body.length <= 250)
          ? (
            <Col>
              {review.body}
            </Col>
          )
          : (
            <Col>
              {body}
              {(body.length <= 250) ? <span onClick={() => setBody(review.body)}>... <u>See more</u></span> : <span onClick={() => setBody(review.body.substring(0, 250))}> <u>See less</u></span>}
            </Col>
          )}
      </Row>
      <Row className="review-photos">
        {review.photos.map((photo) => <img key={photo.id} className="review-photo" alt="" src={photo.url} onClick={() => { setShow(true); setImage(photo.url); }} />)}
      </Row>
      {review.recommend ? <Row><Col>✓ I recommend this product</Col></Row> : null}
      {review.response ? (
        <Row>
          <Col>
            Response:
            {' '}
            {review.response}
          </Col>
        </Row>
      ) : null}
      <Row className="review-helpful">
        {helpful ? (
          <Col>
            Marked as helpful! (
            {review.helpfulness}
            )
          </Col>
        ) : (
          <Col>
            Was this review helpful?
            {' '}
            <span style={{ cursor: 'pointer' }} onClick={(e) => { markReview(e, review.review_id, 'Yes'); setHelpful(true); }}><u>Yes</u></span>
            {' '}
            (
            {review.helpfulness}
            ) |
            {' '}
            <span style={{ cursor: 'pointer' }} value="Report" onClick={(e) => markReview(e, review.review_id, 'Report')}><u>Report</u></span>
          </Col>
        )}
      </Row>
      <Divider className="review-divide" />
      <ImageModal
        image={image}
        show={show}
        onHide={() => setShow(false)}
      />
    </Container>
  );
};

Review.propTypes = {
  review: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    reviewer_name: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
    })),
    recommend: PropTypes.bool,
    response: PropTypes.string,
    helpfulness: PropTypes.number.isRequired,
  }),
  markReview: PropTypes.func.isRequired,
};

Review.defaultProps = {
  review: null,
};

export default Review;
