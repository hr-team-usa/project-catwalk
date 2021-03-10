import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'react-bootstrap';
import Rating from '@material-ui/lab/Rating';

const Review = ({ review, markHelpful }) => {
  const [helpful, setHelpful] = useState(false);
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
        <Col>
          {`${review.reviewer_name}, ${month} ${day}, ${year}`}
        </Col>
      </Row>
      <Row>
        <Col>
          {review.summary}
        </Col>
      </Row>
      <Row>
        <Col>
          {review.body}
        </Col>
      </Row>
      <Row>
        {review.photos.map((photo) => <img key={photo.id} alt="" src={photo.url} />)}
      </Row>
      {review.recommended ? <Row><Col>✓ I recommend this product</Col></Row> : null}
      {review.response ? (
        <Row>
          <Col>
            Response:
            {' '}
            {review.response}
          </Col>
        </Row>
      ) : null}
      <Row>
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
            <span onClick={(e) => { markHelpful(e, review.review_id); setHelpful(true); }}><u>Yes</u></span>
            {' '}
            (
            {review.helpfulness}
            ) |
            {' '}
            <u>Report</u>
          </Col>
        )}
      </Row>

      <style jsx>
        {`
          img {
            height: 150px;
          }
      `}
      </style>

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
    recommended: PropTypes.bool,
    response: PropTypes.string,
    helpfulness: PropTypes.number.isRequired,
  }),
  markHelpful: PropTypes.func.isRequired,
};

Review.defaultProps = {
  review: null,
};

export default Review;
