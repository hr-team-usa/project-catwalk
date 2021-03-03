import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

const RatingBreakdown = ({ ratings }) => {
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

  useEffect(() => {
    createBarRatings(ratings);
  }, []);

  return (
    <div className={classes.root}>
      <div>
        5 Stars
        <LinearProgress variant="determinate" value={Number(percentages['5'])} />
      </div>
      <div>
        4 Stars
        <LinearProgress variant="determinate" value={Number(percentages['4'])} />
      </div>
      <div>
        3 Stars
        <LinearProgress variant="determinate" value={Number(percentages['3'])} />
      </div>
      <div>
        2 Stars
        <LinearProgress variant="determinate" value={Number(percentages['2'])} />
      </div>
      <div>
        1 Stars
        <LinearProgress variant="determinate" value={Number(percentages['1'])} />
      </div>
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
};

RatingBreakdown.defaultProps = {
  ratings: null,
};

export default RatingBreakdown;
