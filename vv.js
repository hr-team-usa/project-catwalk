/*eslint-disable*/
// Create a function that calculates the number of different squares in an n * n square grid. Check the Resources tab.

// i - number standard
// o - number of total squares
// c - ba
// e - 0

// const findAllSquares = (num) => {
  // if num is 0
    // return 0
  // if num is 1
    // return 1

//   // declare variable num * num
//   // declare row squares num - 1
//   // declare col squares num - 1
//   // declare outer square set 1
//   // declare larger variable = 0
//   // if num > 3
//     // set larger to num

//   // return the addition of all the variables
//   if (!num) {
//     return 0;
//   }
//   if (num === 1) {
//     return 1;
//   }
//   const smallSquares = num * num;
//   const rowSquares = num - 1;
//   const colSquares = num - 1;
//   const largeSquare = 1;
//   let extraSquares = 0;
//   if (num > 3) {
//     extraSquares = num;
//   }
//   return smallSquares + rowSquares + colSquares + largeSquare + extraSquares;
// };

const findAllSquares = (num) => {
  if (!num) {
    return 0;
  }
  if (num === 1) {
    return 1;
  }
  // declare previous result
  // iterate up to the number
    // index * index + previous result = current result
    // set that to previous result
  // return that result
  let result = 1;
  for (let i = 2; i <= num; i++) {
    result = (i * i) + result;
  }
  return result;
};

console.log(findAllSquares(5))

// 1 - 1
// 2 - 5
// 3 - 14
// 4 - 30
// 5 - 55
// 6 - 91

