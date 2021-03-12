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
  xit('runs a basic jest test', () => {
    expect(true).toEqual(true);
  });

  it('runs a test on our App component with enzyme', () => {
    const app = shallow(<App />);

    expect(app.find('ProductDescription')).toBeDefined();
  });
});

xdescribe('QAs test suite', () => {
  xit('runs a basic jest test', () => {
    expect(true).toEqual(true);
  });

  it ('runs a test on the QAs component with enzyme', () => {
    const qas = shallow(<QAs />);
    expect(qas.contains(<AddQuestion />)).toBeTruthy();
  });
});
