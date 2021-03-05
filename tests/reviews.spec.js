/*eslint-disable*/

import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from '../pages/index.jsx';
import Reviews from '../components/Reviews-Jim/Reviews';

Enzyme.configure({ adapter: new Adapter() });

xdescribe('Reviews Component', () => {
  it('should expect true to equal true', () => {
    expect(true).toEqual(true);
  });

  it('should render the component without crashing', () => {
    const div =  document.createElement('div');
    ReactDOM.render(<Reviews />, div);
    console.log('true');
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should have a summary title in the review', () => {

  })
});
