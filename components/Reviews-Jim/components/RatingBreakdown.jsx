/* eslint-disable */
import React, { useState, useEffect } from 'react';
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

  const createBarRatings = (obj) => {
    const keys = Object.keys(obj).map(Number);
    const values = Object.values(obj).map(Number);
    const ratingsTotal = Object.values(obj).map(Number).reduce((a, b) => (a + b), 0);
    let ratingsObj = {
      5: 0,
      4: 0,
      3: 0,
      2: 0,
      1: 0,
    }
    for (let i = 0; i < keys.length; i += 1) {
      ratingsObj[keys[i]] = findPercentage(values[i], ratingsTotal);
    }
    console.log('ratings object', ratingsObj)
    return setPercentages(ratingsObj);
  };

  const findPercentage = (rating, total) => {
    return Math.ceil((rating / total) * 100);
  };

  useEffect(() => {
    createBarRatings(ratings);
  }, []);

  return (
    <div className={classes.root}>
      <div>5 Stars
        <LinearProgress variant="determinate" value={percentages['5']} />
      </div>
      <div>4 Stars
        <LinearProgress variant="determinate" value={percentages['4']} />
      </div>
      <div>3 Stars
        <LinearProgress variant="determinate" value={percentages['3']} />
      </div>
      <div>2 Stars
        <LinearProgress variant="determinate" value={percentages['2']} />
      </div>
      <div>1 Stars
        <LinearProgress variant="determinate" value={percentages['1']} />
      </div>
    </div>
  );
};

export default RatingBreakdown;