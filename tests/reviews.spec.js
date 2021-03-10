/*eslint-disable*/
import { configure, shallow, mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

import axios from 'axios';
import moxios from 'moxios';

import App from '../pages/index.jsx';
import Reviews from '../components/Reviews-Jim/Reviews';
import ReviewsList from '../components/Reviews-Jim/components/ReviewsList';
import Review from '../components/Reviews-Jim/components/Review';
import ReviewsBreakdown from '../components/Reviews-Jim/components/ReviewsBreakdown';

const productReviews = [
  {
      "review_id": 210512,
      "rating": 3,
      "summary": "Aut repellendus vel.",
      "recommend": true,
      "response": "\"Ullam et in.\"",
      "body": "Esse qui et nesciunt. Rerum dicta autem placeat. Eligendi amet reiciendis rerum voluptate et quas maxime consectetur.",
      "date": "2020-09-09T00:00:00.000Z",
      "reviewer_name": "Imelda24",
      "helpfulness": 23,
      "photos": [
          {
              "id": 373584,
              "url": "https://images.unsplash.com/photo-1519241978701-4302ab53de1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
          },
          {
              "id": 373585,
              "url": "https://images.unsplash.com/photo-1532244769164-ff64ddeefa45?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          }
      ]
  },
  {
      "review_id": 210513,
      "rating": 3,
      "summary": "Suscipit iste minus aperiam facere.",
      "recommend": true,
      "response": null,
      "body": "Est veniam ut distinctio sint vel qui est. Numquam impedit sed blanditiis molestias voluptas officiis ut. Voluptatem consequatur porro ut repellendus tempore adipisci dignissimos. Nihil voluptatibus inventore cum. Velit sit veritatis et est tempore reiciendis autem harum quis.",
      "date": "2020-10-26T00:00:00.000Z",
      "reviewer_name": "Bailee5",
      "helpfulness": 18,
      "photos": [
          {
              "id": 373583,
              "url": "https://images.unsplash.com/photo-1542702942-161ceb2e3d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          }
      ]
  },
  {
      "review_id": 210511,
      "rating": 4,
      "summary": "Cum asperiores rerum autem voluptas.",
      "recommend": true,
      "response": "\"Culpa vero totam esse.\"",
      "body": "Enim illum ea. Id quo distinctio maiores ut. Porro esse eos et omnis qui architecto magnam. Ut autem autem odio optio sint at et.",
      "date": "2020-12-20T00:00:00.000Z",
      "reviewer_name": "Albert37",
      "helpfulness": 6,
      "photos": [
          {
              "id": 373586,
              "url": "https://images.unsplash.com/photo-1519241978701-4302ab53de1b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80"
          }
      ]
  },
  {
      "review_id": 210510,
      "rating": 3,
      "summary": "Et fugit quia voluptatibus ipsa soluta autem sed.",
      "recommend": true,
      "response": null,
      "body": "Vero repellat saepe laudantium voluptatem voluptatem repellendus et illum doloribus. Possimus eos et cumque consequatur quod atque sed repellat. Sed architecto et aspernatur nisi officiis. Sunt id dolorem eum occaecati. Ea quos ab qui voluptas voluptatum temporibus natus laboriosam. Ipsum voluptas corporis.",
      "date": "2021-02-07T00:00:00.000Z",
      "reviewer_name": "Arely_Olson",
      "helpfulness": 4,
      "photos": [
          {
              "id": 373587,
              "url": "https://images.unsplash.com/photo-1554735490-80893c93b06f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          },
          {
              "id": 373588,
              "url": "https://images.unsplash.com/photo-1558422504-3d17542c1799?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
          }
      ]
  },
  {
      "review_id": 210508,
      "rating": 5,
      "summary": "Quis explicabo quis non ad architecto est.",
      "recommend": true,
      "response": null,
      "body": "Dolores ad qui rerum. Hic maxime voluptas unde alias repellat vel quis iusto aliquid. Rem distinctio voluptatem quasi maxime quo dolores quos iure. Nesciunt labore incidunt numquam molestiae vitae.",
      "date": "2020-09-01T00:00:00.000Z",
      "reviewer_name": "Gideon57",
      "helpfulness": 1,
      "photos": [
          {
              "id": 373590,
              "url": "https://images.unsplash.com/photo-1485646979142-d4abb57a876f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80"
          }
      ]
  }
];
const productMeta = {
  "product_id": "18201",
  "ratings": {
      "2": "5",
      "3": "5",
      "4": "1",
      "5": "1"
  },
  "recommended": {
      "true": "12"
  },
  "characteristics": {
      "Fit": {
          "id": 61056,
          "value": "3.6666666666666667"
      },
      "Length": {
          "id": 61057,
          "value": "3.1666666666666667"
      },
      "Comfort": {
          "id": 61058,
          "value": "2.3333333333333333"
      },
      "Quality": {
          "id": 61059,
          "value": "3.0833333333333333"
      }
  }
};

// USE beforeEach() TO START EACH TEST WITH THE SAME CODE (LIKE A WRAPPER)

xdescribe('Reviews Component', () => {

  describe('Jest tests that test the Jest!', () => {
    it('should expect true to equal true', () => {
      expect(true).toEqual(true);
    });
  })

  describe('Parent Component', () => {
    const dummyProps = {
      productId: 0,
      setProductRating: () => {},
      reviewsRef: {},
      productName: 'string',
    }

    it('should render correctly with no props', () => {
      const wrapper = shallow(<Reviews {...dummyProps} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should render the widget title', () => {
      const wrapper = shallow(<Reviews {...dummyProps} />);
      expect(wrapper.find('.reviews-title').text()).toContain('Ratings & Reviews');
    });
  })

  describe('Reviews Breakdown', () => {

  })

  describe('Reviews List', () => {
    const dummyProps = {
      productReviews: [{
        rating: 0,
        reviewer_name: 'string',
        date: 'string',
        summary: 'string',
        body: 'string',
        photos: [{
          id: 0,
          url: 'string',
        }],
        recommended: true,
        response: 'string',
        helpfulness: 0,
      }],
      sortStatus: 'relevant',
      handleSortChange: () => {},
      renderToggle: true,
      setRenderToggle: () => {},
      selectedRatings: [0],
      ratingsLength: 0,
      characteristics: {
          // id: 0,
          // value: 'string',
      },
      productName: 'string',
      productId: 0,
    }

    it('should have a button that adds two reviews', () => {
      const wrapper = shallow(<ReviewsList {...dummyProps} />);
      expect(wrapper.find('#more-reviews-btn').text()).toBe('More Reviews');
    });

    it('should use relevant as a default sort status', () => {
      const wrapper = shallow(<ReviewsList {...dummyProps} />);
      // force it to call use state
      // find the select inside reviews list -- id or classname
      expect(wrapper.find('select').props().value).toBe('relevant');
    });
  })
});

// console.log(wrapper.debug());