/*eslint-disable*/
import { shallow, mount } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils'

// import ProductDescription from '../components/Description-Scott/ProductDescription.jsx';
import SelectSize from '../components/Description-Scott/AddToCart/SelectSize.jsx';
import SelectQuantity from '../components/Description-Scott/AddToCart/SelectQuantity.jsx';
import Add from '../components/Description-Scott/AddToCart/Add.jsx';
import Price from '../components/Description-Scott/ProductInfo/Price.jsx';
import StyleSelector from '../components/Description-Scott/StyleSelector/StyleSelector.jsx';
import ProductInfo from '../components/Description-Scott/ProductInfo/ProductInfo.jsx';
import ImageGallery from '../components/Description-Scott/ImageGallery/ImageGallery.jsx';
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

    it('displays only in-stock styles in the dropdown when clicked', async () => {
      const styleInfo = {
        style_id: 96887,
        name: "Forest Green & Black",
        skus: {
          560837: { quantity: 6, size: "XS" },
          560838: { quantity: 0, size: "S" },
          560839: { quantity: 9, size: "M" },
        },
      }

      let wrapper;
      act(() => {
        wrapper = mount(<SelectSize styleInfo={styleInfo} setSku={() => { }} setIsOutOfStock={() => { }} invalidAdd={false} setInvalidAdd={() => { }} />);
      });
      await act(
        () =>
          new Promise((resolve) => {
            setImmediate(() => {
              wrapper.update();
              resolve();
            });
          })
      );
      const button = wrapper.find('.btn');

      act(() => {
        button.simulate('click');
      });
      await act(
        () =>
          new Promise((resolve) => {
            setImmediate(() => {
              wrapper.update();
              resolve();
            });
          })
      );

      const dropdownItems = wrapper.find('DropdownItem');
      expect(dropdownItems).toHaveLength(3);
      expect(dropdownItems.at(0).text()).toBe('Select Size');
      expect(dropdownItems.at(1).text()).toBe('XS');
      expect(dropdownItems.at(2).text()).toBe('M');
    })
  })

  describe('Select Quantity Dropdown tests', () => {
    it('displays a list up to 15 when quantity of style is > 15', () => {
    })

    it('is disabled and displays "-" when no sku has been selected', () => {
      const styleInfo = {
        style_id: 96887,
        name: "Forest Green & Black",
        skus: {
          560837: { quantity: 25, size: "XS" },
          560838: { quantity: 20, size: "S" },
          560839: { quantity: 19, size: "M" },
        },
      }

      const wrapper = mount(<SelectQuantity sku={null} setQuantitySelected={() => { }} />);

      const dropdown = wrapper.find('DropdownButton');
      expect(dropdown).toHaveLength(1);
      expect(dropdown.prop('disabled')).toBe(true);
      expect(dropdown.prop('title')).toBe('-');
    })

    it('is defaults to 1 when a sku has been selected', async () => {
      const styleInfo = {
        style_id: 96887,
        name: "Forest Green & Black",
        skus: {
          560837: { quantity: 25, size: "XS" },
          560838: { quantity: 20, size: "S" },
          560839: { quantity: 19, size: "M" },
        },
      }
      let wrapper;
      act(() => {
        wrapper = mount(<SelectQuantity sku={styleInfo.skus[560837]} setQuantitySelected={() => { }} />);
      });
      await act(
        () =>
          new Promise((resolve) => {
            setImmediate(() => {
              wrapper.update();
              resolve();
            });
          })
      );
      const button = wrapper.find('.btn');

      act(() => {
        // appears you can only call simulate on a variable that points to one node:
        button.simulate('click');
        // for some reason wrapper.find('.btn').simulate('click') DOES NOT work
      });

      await act(
        () =>
          new Promise((resolve) => {
            setImmediate(() => {
              wrapper.update();
              resolve();
            });
          })
      );

      const dropdown = wrapper.find('DropdownButton');
      expect(dropdown.prop('title')).toBe(1);

      const dropdownItems = wrapper.find('DropdownItem');
      expect(dropdownItems).toHaveLength(15);
    })

    it('is displays only up to the quantity available if that quantity is less than 15', async () => {
      const styleInfo = {
        style_id: 96887,
        skus: {
          560837: { quantity: 3, size: "XS" },
        },
      }
      let wrapper;
      act(() => {
        wrapper = mount(<SelectQuantity sku={styleInfo.skus[560837]} setQuantitySelected={() => { }} />);
      });
      await act(
        () =>
          new Promise((resolve) => {
            setImmediate(() => {
              wrapper.update();
              resolve();
            });
          })
      );
      const button = wrapper.find('.btn');

      act(() => {
        // appears you can only call simulate on a variable that points to one node:
        button.simulate('click');
        // for some reason wrapper.find('.btn').simulate('click') DOES NOT work
      });

      await act(
        () =>
          new Promise((resolve) => {
            setImmediate(() => {
              wrapper.update();
              resolve();
            });
          })
      );

      const dropdown = wrapper.find('DropdownButton');
      expect(dropdown.prop('title')).toBe(1);

      const dropdownItems = wrapper.find('DropdownItem');
      expect(dropdownItems).toHaveLength(3);
    })
  })

  describe('Add to Cart button tests', () => {

    it('displays a button when items are in stock', () => {
      const mockUseEffect = jest.fn();
      React.useEffect = mockUseEffect;

      const wrapper = mount(<Add quantitySelected={null} isOutOfStock={false} sku={null} setInvalidAdd={() => { }} setCart={() => { }} cart={[]} productName={'dummy'} />);

      mockUseEffect.mockClear();
      wrapper.setProps();

      const button = wrapper.find('button')
      expect(button).toHaveLength(1);
    });

    it('does not display a button when items are out of stock', () => {
      const mockUseEffect = jest.fn();
      React.useEffect = mockUseEffect;

      const wrapper = mount(<Add quantitySelected={null} isOutOfStock={true} sku={null} setInvalidAdd={() => { }} setCart={() => { }} cart={[]} productName={'dummy'} />);

      mockUseEffect.mockClear();
      wrapper.setProps();

      const button = wrapper.find('button')
      expect(button).toHaveLength(0);
    });
  })

  describe('Price component tests', () => {
    it('displays the sale price (with a "$") when a style has a sale price', () => {

      const mockUseEffect = jest.fn();
      React.useEffect = mockUseEffect;

      const wrapper = mount(<Price styleInfo={{
        style_id: 96887,
        name: "Forest Green & Black",
        original_price: "200.00",
        sale_price: "100.00",
      }} />);

      mockUseEffect.mockClear();
      wrapper.setProps();

      const salePrice = wrapper.find('span.salePrice')
      expect(salePrice).toHaveLength(1);
      expect(salePrice.text()).toBe('$100.00')
    })


    it('only displays original price when sale price is null', () => {

      const mockUseEffect = jest.fn();
      React.useEffect = mockUseEffect;

      const wrapper = mount(<Price styleInfo={{
        style_id: 96887,
        name: "Forest Green & Black",
        original_price: "200.00",
        sale_price: null,
      }} />);

      mockUseEffect.mockClear();
      wrapper.setProps();

      const salePrice = wrapper.find('span.salePrice')
      expect(salePrice).toHaveLength(0);
      expect(wrapper.text()).toBe('$200.00');
    })
  })

  describe('Style Selector component tests', () => {
    var allStyles = [
      {
        'default?': true,
        name: "Forest Green & Black",
        original_price: "140.00",
        photos: [{
          thumbnail_url: "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          url: "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2761&q=80"
        }, {
          thumbnail_url: "https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          url: "https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80"
        }],
        sale_price: null,
        skus: {},
        style_id: 96887,
      },
      {
        'default?': false,
        name: "Desert Brown & Tan",
        original_price: "140.00",
        photos: [{
          thumbnail_url: "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          url: "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2761&q=80"
        }, {
          thumbnail_url: "https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          url: "https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80"
        }],
        sale_price: null,
        skus: {},
        style_id: 96888,
      },
      {
        'default?': false,
        name: "Ocean Blue & Grey",
        original_price: "140.00",
        photos: [{
          thumbnail_url: "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          url: "https://images.unsplash.com/photo-1556304653-cba65c59b3c5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2761&q=80"
        }, {
          thumbnail_url: "https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80",
          url: "https://images.unsplash.com/photo-1544131750-2985d621da30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80"
        }],
        sale_price: "100.00",
        skus: {},
        style_id: 96889,
      }
    ]

    var styleInfo = allStyles[0];

    xit('updates the StyleInfo when a new style is clicked', () => {

      // const mockUseEffect = jest.fn();
      // React.useEffect = mockUseEffect;

      const wrapper = mount(<StyleSelector allStyles={allStyles} styleInfo={styleInfo} setStyleInfo={(newStyle) => {
        // check if newStyle is the style we clicked
      }} />);

      // mockUseEffect.mockClear();
      // wrapper.setProps();
      // expect(mockUseEffect).toHaveBeenCalled();

      expect(wrapper.find('h5').text()).toBe("Style >Forest Green & Black");

      const styleThumbnails = wrapper.find('img.selectedThumbnail');
      expect(styleThumbnails).toHaveLength(3);
      const newStyle = styleThumbnails.at(1);
      console.log('newStyleImg ', newStyle.debug());

      // newStyle.simulate('click');
      newStyle.prop('onClick')();

      // expect handleClick to have been called

      wrapper.update();

      //expect the h5 to now read the new style name
      expect(wrapper.find('h5').text()).toBe("Style >Desert Brown & Tan");

      // console.logs placed in handleClick show that it is being called with the new styleId, but this doesnt change the styleInfo prop that is passed into our component.

    })

    it('displays a checkmark on the currently selected style', () => {
      styleInfo = allStyles[2]
      const wrapper = mount(<StyleSelector allStyles={allStyles} styleInfo={styleInfo} setStyleInfo={() => { }} />);

      expect(wrapper.find('Image.checkmark').at(0).prop('hidden')).toBe(true);
      expect(wrapper.find('Image.checkmark').at(1).prop('hidden')).toBe(true);
      expect(wrapper.find('Image.checkmark').at(2).prop('hidden')).toBe(false);
    })
  })

  describe('Product Info component tests', () => {

    it('displays Stars component if productRating is not 0', () => {

      const wrapper = mount(<ProductInfo
        productName='Parachute Pants'
        category='pants'
        description='very comfortable pants'
        styleInfo={{
          style_id: 96887,
          name: "Forest Green & Black",
          original_price: "200.00",
          sale_price: null,
        }}
        productRating='3.4'
        reviewsref={null}
      />);

      const stars = wrapper.find('Stars')
      expect(stars).toHaveLength(1);
    })

    it('does not display Stars component if productRating is null', () => {

      const wrapper = mount(<ProductInfo
        productName='Parachute Pants'
        category='pants'
        description='very comfortable pants'
        styleInfo={{
          style_id: 96887,
          name: "Forest Green & Black",
          original_price: "200.00",
          sale_price: null,
        }}
        productRating={null}
        reviewsref={null}
      />);

      expect(wrapper.find('Stars')).toHaveLength(0);
    })
  })

  describe('Image Gallery component tests', () => {
    it('renders seven thumbnails when seven exist', () => {
      const wrapper = mount(<ImageGallery
        styleInfo={{
          'default?': true,
          name: "Forest Green & Black",
          original_price: "140.00",
          photos: [{ thumbnail_url: "https://images.unsplash.com/photo-1501088430049-71…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1501088430049-71…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80" },
          { thumbnail_url: "https://images.unsplash.com/photo-1534011546717-40…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1534011546717-40…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80" },
          { thumbnail_url: "https://images.unsplash.com/photo-1549831243-a69a0…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1549831243-a69a0…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80" },
          { thumbnail_url: "https://images.unsplash.com/photo-1527522883525-97…2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1527522883525-97…2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80" },
          { thumbnail_url: "https://images.unsplash.com/photo-1556648202-80e75…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1556648202-80e75…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80" },
          { thumbnail_url: "https://images.unsplash.com/photo-1532543491484-63…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1532543491484-63…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80" },
          { thumbnail_url: "dummy", url: "dummy" }
          ],
          sale_price: null,
          style_id: 96887,
        }}
        setIsExpanded={() => { }}
      />);

      expect(wrapper.find('button.upArrow')).toHaveLength(0);
      expect(wrapper.find('CardImg')).toHaveLength(7);
    })

    it('does not render more than seven thumbnails at a time when more than seven exist', () => {
      const wrapper = mount(<ImageGallery
        styleInfo={{
          'default?': true,
          name: "Forest Green & Black",
          original_price: "140.00",
          photos: [{ thumbnail_url: "https://images.unsplash.com/photo-1501088430049-71…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1501088430049-71…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80" },
          { thumbnail_url: "https://images.unsplash.com/photo-1534011546717-40…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1534011546717-40…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2734&q=80" },
          { thumbnail_url: "https://images.unsplash.com/photo-1549831243-a69a0…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1549831243-a69a0…cHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2775&q=80" },
          { thumbnail_url: "https://images.unsplash.com/photo-1527522883525-97…2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1527522883525-97…2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80" },
          { thumbnail_url: "https://images.unsplash.com/photo-1556648202-80e75…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=300&q=80", url: "https://images.unsplash.com/photo-1556648202-80e75…hcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80" },
          { thumbnail_url: "000", url: "000" },
          { thumbnail_url: "111", url: "111" },
          { thumbnail_url: "222", url: "222" },
          { thumbnail_url: "333", url: "333" }
          ],
          sale_price: null,
          style_id: 96887,
        }}
        setIsExpanded={() => { }}
      />);

      expect(wrapper.find('CardImg')).toHaveLength(7);
    })

    it('displays arrow buttons when more than seven thumbnails exist', () => {
      const wrapper = mount(<ImageGallery
        styleInfo={{
          'default?': true,
          name: "Forest Green & Black",
          original_price: "140.00",
          photos: [
            { thumbnail_url: "000", url: "000" },
            { thumbnail_url: "111", url: "111" },
            { thumbnail_url: "222", url: "222" },
            { thumbnail_url: "333", url: "333" },
            { thumbnail_url: "444", url: "444" },
            { thumbnail_url: "555", url: "555" },
            { thumbnail_url: "666", url: "666" },
            { thumbnail_url: "777", url: "777" },
            { thumbnail_url: "888", url: "888" },
          ],
          sale_price: null,
          style_id: 96887,
        }}
        setIsExpanded={() => { }}
      />);

      expect(wrapper.find('button.upArrow')).toHaveLength(2);
    })
  })

})