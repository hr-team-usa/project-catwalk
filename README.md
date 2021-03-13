# Front End Capstone
An e-commerce web app that includes a product overview, comparison tools and outfit builder, user questions and answers, and a ratings and reviews breakdown.

[DEMO VIDEO]

## Getting Started
Fork and clone the Front End Capstone repository to your preferred directory:

```
$ git clone https://github.com/hr-team-usa/project-catwalk.git
```

Open the project and install the dependencies included in the package.json:

```
$ npm install
```

This project uses Next.js and the following commands to run in development mode, build production mode, or run in production:

```
$ npm run dev
$ npm run build
$ npm run start
```

Test this project using Jest and Enzyme:

```
$ npm run test
```

## Product Overview
[Screenshot]

### Overview & Features
### Challenges
### Results & Wins

## Product Comparison & Outfit
[Screenshot]

### Overview & Features
### Challenges
### Results & Wins

## Questions & Answers
[Screenshot]

### Overview & Features
### Challenges
### Results & Wins

## Reviews & Ratings
[Screenshot]

### Overview & Features
The Reviews & Ratings widget displays all the reviews for each product, a breakdown of the ratings and characteristics, and a form to submit a new reviews. Users can mark reviews as helpful, report bad ones, and filter reviews based on their ratings.

### Challenges
This widget pulls data from two different APIs, product reviews and product meta (ratings and characteristics), which presented challenges when building out the components. They split and share information from the API, so it needed to be built out with that in mind.

### Results & Wins
Users can easily select ratings, filter reviews, and clear those filters with one "remove all" click. The reviews render quickly as they don't need to call the API for every filter -- just on initialization and sorting (which is a specific API endpoint). The characteristics ratings also use vanilla CSS as Material UI and Bootstrap didn't have a component that fit the need.

## Built With:
* React
* Next.js
* Bootstrap
* React-Bootstrap
* Material UI
* Axios
* Jest & Enzyme

## Authors
[Scott Guinn](https://github.com/Scott-Guinn)
[Dorien Pine](https://github.com/Initial-D-cmd)
[Malcolm Marshall](https://github.com/Malcolm-Marshall)
[Jim Burch](https://github.com/JimBurch)