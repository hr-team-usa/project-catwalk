/*eslint-disable*/
import React from 'react';
// // import { render, cleanup, waitForElement } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import axiosMock from 'axios';
import ReviewsList from '../components/Reviews-Jim/components/ReviewsList';

// afterEach(cleanup);

xdescribe('Reviews Widget', () => {
  it('should fetch product review data', async () => {
    const productId = '18201';
    const {} = render(<ReviewsList productId={productId} />);
    expect(getByTestId('review-count')).toHaveTextContent('XXX reviews, sorted by');
  })
});