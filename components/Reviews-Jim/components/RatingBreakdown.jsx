import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const RatingBreakdown = ({
  ratings, selectedRatings, setSelectedRatings, setRatingsLength,
}) => {
  const classes = useStyles();
  const [percentages, setPercentages] = useState({});
  const findPercentage = (rating, total) => Math.floor((rating / total) * 100);

  const createBarRatings = (obj) => {
    const keys = Object.keys(obj).map(Number);
    const values = Object.values(obj).map(Number);
    const ratingsTotal = Object.values(obj).map(Number).reduce((a, b) => (a + b), 0);
    const ratingsObj = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    };
    for (let i = 0; i < keys.length; i += 1) {
      ratingsObj[keys[i]] = findPercentage(values[i], ratingsTotal);
    }
    setPercentages(ratingsObj);
  };

  const selectRating = (e, value) => {
    e.preventDefault();
    const newRatings = selectedRatings;
    if (!newRatings.length || !newRatings.includes(value)) {
      newRatings.push(value);
      setSelectedRatings(newRatings);
      setRatingsLength(newRatings.length);
    } else {
      newRatings.splice(newRatings.indexOf(value), 1);
      setSelectedRatings(newRatings);
      setRatingsLength(newRatings.length);
    }
  };

  useEffect(() => {
    createBarRatings(ratings);
  }, [ratings]);

  return (
    <div className={classes.root}>
      <div role="button" className="rating-bar" id="five-rating" onClick={(e) => selectRating(e, 5)}>
        5 Stars (
        {ratings['5'] ? ratings['5'] : '0'}
        )
        <LinearProgress
          variant="determinate"
          value={Number(percentages['5'])}
          color="secondary"
        />
        {selectedRatings.includes(5)
          ? (
            <style>
              {`
          #five-rating {
            background-color: lightgray;
          }
        `}
            </style>
          ) : null}
      </div>
      <div role="button" className="rating-bar" id="four-rating" onClick={(e) => selectRating(e, 4)}>
        4 Stars (
        {ratings['4'] ? ratings['4'] : '0'}
        )
        <LinearProgress variant="determinate" value={Number(percentages['4'])} />
        {selectedRatings.includes(4)
          ? (
            <style>
              {`
          #four-rating {
            background-color: lightgray;
          }
        `}
            </style>
          ) : null}
      </div>
      <div role="button" className="rating-bar" id="three-rating" onClick={(e) => selectRating(e, 3)}>
        3 Stars (
        {ratings['3'] ? ratings['3'] : '0'}
        )
        <LinearProgress variant="determinate" value={Number(percentages['3'])} />
        {selectedRatings.includes(3)
          ? (
            <style>
              {`
          #three-rating {
            background-color: lightgray;
          }
        `}
            </style>
          ) : null}
      </div>
      <div role="button" className="rating-bar" id="two-rating" onClick={(e) => selectRating(e, 2)}>
        2 Stars (
        {ratings['2'] ? ratings['2'] : '0'}
        )
        <LinearProgress variant="determinate" value={Number(percentages['2'])} />
        {selectedRatings.includes(2)
          ? (
            <style>
              {`
          #two-rating {
            background-color: lightgray;
          }
        `}
            </style>
          ) : null}
      </div>
      <div role="button" className="rating-bar" id="one-rating" onClick={(e) => selectRating(e, 1)}>
        1 Stars (
        {ratings['1'] ? ratings['1'] : '0'}
        )
        <LinearProgress variant="determinate" value={Number(percentages['1'])} />
        {selectedRatings.includes(1)
          ? (
            <style>
              {`
          #one-rating {
            background-color: lightgray;
          }
        `}
            </style>
          ) : null}
      </div>
      {selectedRatings.length ? (
        <div onClick={() => { setSelectedRatings([]); setRatingsLength(0); }}><u>Remove rating filters</u></div>
      ) : null}
    </div>
  );
};

RatingBreakdown.propTypes = {
  ratings: PropTypes.shape({
    1: PropTypes.string,
    2: PropTypes.string,
    3: PropTypes.string,
    4: PropTypes.string,
    5: PropTypes.string,
  }),
  selectedRatings: PropTypes.arrayOf(PropTypes.number),
  setSelectedRatings: PropTypes.func.isRequired,
  setRatingsLength: PropTypes.func.isRequired,
};

RatingBreakdown.defaultProps = {
  ratings: null,
  selectedRatings: PropTypes.arrayOf(null),
};

export default RatingBreakdown;
