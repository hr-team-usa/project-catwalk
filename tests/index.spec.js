/*eslint-disable*/

import { shallow } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import App from '../pages/index.jsx';
import ProductDescription from '../components/Description-Scott/ProductDescription';
import QAs from '../components/QAs-Malcolm/QAs';
import AddQuestion from '../components/QAs-Malcolm/components/AddQuestion';

describe('index.js test suite', () => {
  it('runs a basic jest test', () => {
    expect(true).toEqual(true);
  });

  it('runs a test on our App component with enzyme', () => {
    const app = shallow(<App />);

    expect(app.contains(<ProductDescription productId={18078} />)).toBeTruthy();
  });
});

describe('QAs test suite', () => {
  it('runs a basic jest test', () => {
    expect(true).toEqual(true);
  });

  xit ('runs a test on the QAs component with enzyme', () => {
    const qas = shallow(<QAs />);
    expect(qas.contains(<AddQuestion />)).toBeTruthy();
  });
});
/* THIS IS FROM THE INTERNET FOR REFERENCE:
describe("With Enzyme", () => {
  it('App shows "Hello, Sunshine!"', () => {
    const app = shallow(<App />);

    expect(app.find("div").text()).toEqual("Hello, Sunshine!");
  });
});

describe("With Snapshot Testing", () => {
  it('App shows "Hello, Sunshine!"', () => {
    const component = renderer.create(<App />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

*/