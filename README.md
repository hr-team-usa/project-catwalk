# Front End Capstone
An e-commerce web app that includes a product overview, comparison tools and outfit builder, user questions and answers, and a ratings and reviews breakdown.

## Product Demo
[![Alt text](/screenshots/NextLevel-DemoSS.png)](https://www.youtube.com/watch?v=0lDV6Q23qII)

## Getting Started
Fork and clone the Front End Capstone repository to your preferred directory:

```
$ git clone https://github.com/hr-team-usa/project-catwalk.git
```

Open the project and install the dependencies included in the package.json:

```
$ npm install
```

This project uses Next.js. Use the following commands to launch the app in either development mode or production mode:

```
$ npm run dev
$ npm run build
```

Test this project using Jest and Enzyme:

```
$ npm run test
```

## Product Overview
![Alt text](/screenshots/NextLevel-ProductOverviewSS.png "Product Overview")

### Overview & Features
The Product Overview widget displays the currently selected product. It contains four major subcomponents. 1) An image gallery displaying a carousel of product images with a nested column of thumbnail images. Click the main image (or expand icon) to expand the view and click it again to enter zoom view. 2) Product info is displayed to the right, including up to date sale pricing if avaiable. 3) A style selector shows thumbnails grouped into rows of four for the various styles, click on the thumbnail to change the currently displayed product to that style. 4) An Add to Cart subcomponent which gives users the ability to add items of a specific size and quantity to the cart (stored in local storage as well as in app memory).

### Challenges
Working with a combination of react-bootstrap, material-ui, and vanilla css frameworks presented unique challenges for styling of images and image containers. Particularly the question of how to handle various image aspect ratios in a fixed height and width image carousel. Ultimately the development team decided to crop images to fit the container, rather than distort them to fit, and will encourage the back-end team to provide images of a consistent aspect ratio. Vertical images are displayed in entirety with a soft bordered background to avoid this distortion. Additional challenges included dealing with broken image links and API data that did not provide images.

### Results & Wins
Users can easily navigate through various images and styles with the click of a button. Furthermore, various image display options partially overcome the problem of having images that do not fit easily into a small, fixed container. Thin, soft borders and dividing lines present a clean, polished interface to the user, and simple dropdown selectors make purchasing a cinch.

## Product Comparison & Outfit
[Screenshot]

### Overview & Features
### Challenges
### Results & Wins

## Questions & Answers
[Screenshot]

### Overview & Features
The Questions and Answers widget displays questions and corresponding answers for whatever product is active in the product overview. The user has the ability to rank each question and answer as helpful, which determines the order in which both questions and answers are displayed. There is also an option to report a question if needed, and the reported question will be reviewed for inappropriate content and removed. If a user cannot find the question they would like to see answered, there is a form to fill out a question. Likewise, there is a form to fill out an answer to an already existing question.

### Challenges
A challenge I faced with this widget was state management and controlling the amount of re-renders. The main area where this was a difficulty was with the search component. After three characters are typed in the search bar, the component will only show the questions that contain that sequence of characters, and changes with each additional key stroke. Initially I had this set of search characters being passed to a parent component, then back down two levels of child components. This process triggered too many re-renders of the page resulting in a crash. To resolve this issue, I reorganized where I placed my axios requests so minimal re rendering and requests were needed for the page to function.

### Results & Wins
This single component will fill the browser screen, and never any more than that. If there are more questions or answers, the user has the ability to scroll down within the component, as well as the ability to add more or less questions and or answers. I really like this feature and it makes for a very pleasant user experience.


## Reviews & Ratings
![Alt text](/screenshots/NextLevel-ReviewsSS.png "Reviews & Ratings")

### Overview & Features
The Reviews & Ratings widget displays all the reviews for each product, a breakdown of the ratings and characteristics, and a form to submit a new reviews. Users can mark reviews as helpful, report bad ones, and filter reviews based on their ratings.

### Challenges
This widget pulls data from two different API endpoints, product reviews and product meta (ratings and characteristics), which presented challenges when building out the components. They split and share information from the API, so it needed to be built out with that in mind.

### Results & Wins
Users can easily select ratings, filter reviews, and clear those filters with one "remove all" click. The reviews render quickly as they don't need to call the API for every filter -- just on initialization and sorting (which is a specific API endpoint). The characteristics ratings also use vanilla CSS as Material UI and Bootstrap didn't have a component that fit the need.

## Built With:
* React <img align="left" alt=“React” width="26px" src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" />
* Next.js
* Bootstrap
* React-Bootstrap
* Material UI
* Axios
* Jest & Enzyme
* TLC

## Authors
* [Scott Guinn](https://github.com/Scott-Guinn)
* [Dorien Pine](https://github.com/Initial-D-cmd)
* [Malcolm Marshall](https://github.com/Malcolm-Marshall)
* [Jim Burch](https://github.com/JimBurch)
