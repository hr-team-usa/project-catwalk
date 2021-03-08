/*eslint-disable*/
import { shallow, mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';

import SelectSize from '../components/Description-Scott/AddToCart/SelectSize.jsx';
import Add from '../components/Description-Scott/AddToCart/Add.jsx'
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

describe('product description test suite', () => {

  describe('Select Size Dropdown tests', () => {
    it('runs a basic jest test', () => {
      expect(true).toEqual(true);
    });

    it('displays "Out of Stock" when no SKUs are available', () => {
      const outOfStock = {
        style_id: 96887,
        name: "Forest Green & Black",
        skus: {
          560837: { quantity: 0, size: "XS" },
          560838: { quantity: 0, size: "S" },
          560839: { quantity: 0, size: "M" },
        },
      }
      /*   Because we're using functional components, and there is no 'prototype', a shallow render is essentially useless. The following commented out code at first seemed to work but it's not actually running useEffect (and therefore not an accurate representation of the component):

      const wrapper = shallow(<SelectSize styleInfo={outOfStock} />)
      expect(wrapper.containsMatchingElement(<DropdownButton title="Out of Stock"/>)).toBe(true);

      */

      // This is the way to actually do it:
      const mockUseEffect = jest.fn();
      React.useEffect = mockUseEffect;

      const wrapper = mount(<SelectSize styleInfo={outOfStock} setSku={() => { }} setIsOutOfStock={() => { }} invalidAdd={false} setInvalidAdd={() => { }} />);

      mockUseEffect.mockClear();
      wrapper.setProps();

      expect(mockUseEffect).toHaveBeenCalled();

      // When working with enzyme, this .debug() function I've discovered to be super useful. It acts like a console.log. Try uncommenting the following line out and running the tests and you'll see what I mean.
      // console.log(wrapper.debug())
      const dropdown = wrapper.find('DropdownButton');
      expect(dropdown).toHaveLength(1);
      expect(dropdown.prop('title')).toBe('Out of Stock');
    })

    it('displays "Select Size" when there are items in stock', () => {
      const styleInfo = {
        style_id: 96887,
        name: "Forest Green & Black",
        skus: {
          560837: { quantity: 6, size: "XS" },
          560838: { quantity: 8, size: "S" },
          560839: { quantity: 9, size: "M" },
        },
      }
      const mockUseEffect = jest.fn();
      React.useEffect = mockUseEffect;

      const wrapper = mount(<SelectSize styleInfo={styleInfo} setSku={() => { }} setIsOutOfStock={() => { }} invalidAdd={false} setInvalidAdd={() => { }} />);

      mockUseEffect.mockClear();
      wrapper.setProps();
      //https://enzymejs.github.io/enzyme/docs/api/ShallowWrapper/setProps.html

      expect(mockUseEffect).toHaveBeenCalled();

      const dropdown = wrapper.find('DropdownButton');
      expect(dropdown).toHaveLength(1);
      expect(dropdown.prop('title')).toBe('Select Size');
      // expect(wrapper.containsMatchingElement(<DropdownButton title="Select Size"/>)).toBe(true);
      // expect(dropdownButton).toHaveProperty("title", "Out of Stock");

      /*
        Other links I found useful:
        https://kentcdodds.com/blog/why-i-never-use-shallow-rendering
        - good for understanding the limitations of shallow rendering
        - also gives a good example of shallow rendering

        https://enzymejs.github.io/enzyme/docs/api/shallow.html
        - this shows a bunch of the enzyme methods that are available like .find, .prop, .setProps, etc.

        https://jestjs.io/docs/en/expect
        - lots of the info online is NOT written with jest methods, so you'll need to find the equivalent syntax here (ie. .toHaveLength, .toBe, etc.)
      */
    })

    xit('displays only in-stock styles in the dropdown when clicked', () => {
      const styleInfo = {
        style_id: 96887,
        name: "Forest Green & Black",
        skus: {
          560837: { quantity: 6, size: "XS" },
          560838: { quantity: 0, size: "S" },
          560839: { quantity: 9, size: "M" },
        },
      }
      const mockUseEffect = jest.fn();
      React.useEffect = mockUseEffect;

      const wrapper = mount(<SelectSize styleInfo={styleInfo} setSku={() => { }} setIsOutOfStock={() => { }} invalidAdd={false} setInvalidAdd={() => { }} />);

      mockUseEffect.mockClear();
      wrapper.setProps();
      expect(mockUseEffect).toHaveBeenCalled();

      // simulate a click of the DropdownButton
      // expec the number of dropdown items to be three ("XS, M, and Select Size")
      console.log('wrapper ', wrapper.debug());

      const dropdown = wrapper.find('DropdownButton');

      const dropdownButton = dropdown.find('Dropdown');
      dropdown.simulate('click');
      // after clicking, four buttons should be rendered

      expect(dropdown.find('DropdownItem')).toHaveLength(4);
    })
  })

  describe('Add to Cart button tests', () => {

    it('displays a button when items are in stock', () => {
      const mockUseEffect = jest.fn();
      React.useEffect = mockUseEffect;

      const wrapper = mount(<Add quantitySelected={null} isOutOfStock={false} sku={null} setInvalidAdd={() => { }} />);

      mockUseEffect.mockClear();
      wrapper.setProps();

      const button = wrapper.find('button')
      expect(button).toHaveLength(1);
    });

    it('does not display a button when items are out of stock', () => {
      const mockUseEffect = jest.fn();
      React.useEffect = mockUseEffect;

      const wrapper = mount(<Add quantitySelected={null} isOutOfStock={true} sku={null} setInvalidAdd={() => { }} />);

      mockUseEffect.mockClear();
      wrapper.setProps();

      const button = wrapper.find('button')
      expect(button).toHaveLength(0);
    });
  })

})