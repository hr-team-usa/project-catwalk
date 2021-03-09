/*eslint-disable*/
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import App from '../pages/index.jsx';
import Reviews from '../components/Reviews-Jim/Reviews';
import ReviewsBreakdown from '../components/Reviews-Jim/components/ReviewsBreakdown';

import { getProductReviews } from '../components/Reviews-Jim/components/ReviewsList';
import axios from 'axios';


Enzyme.configure({ adapter: new Adapter() });

xdescribe('Reviews Component', () => {

  describe('Jest tests that test the Jest!', () => {
    it('should expect true to equal true', () => {
      expect(true).toEqual(true);
    });

    it('should render the component without crashing', () => {
      const div =  document.createElement('div');
      ReactDOM.render(<Reviews />, div);
      console.log('true');
      ReactDOM.unmountComponentAtNode(div);
    });
  })

  // describe('API Tests', () => {
  //   // jest.mock('axios');
  //   it('should fetch data correctly from an API', async () => {
  //     const data = getProductReviews("18201");
  //     expect(data).toEqual({});
  //   })
  // })

  describe('Reviews Breakdown', () => {
    // it('should display an average numeric rating to one decimal point', () => {
    //   const ratingsObj = {
    //     2: "5",
    //     3: "5",
    //     2: "1",
    //     1: "1",
    //   }

    //   const mockUseEffect = jest.fn();
    //   React.useEffect = mockUseEffect;

    //   const wrapper = mount(<ReviewsBreakdown productId="18201" />);

    //   mockUseEffect.mockClear();
    //   wrapper.setProps();

    //   console.log(wrapper.debug());

    // })

    // it('should display an average numeric rating to one decimal point', () => {
    //   const wrapper = shallow(<ReviewsBreakdown productId="18201" />)
    //   console.log(wrapper.debug())
    // })
  })
});
