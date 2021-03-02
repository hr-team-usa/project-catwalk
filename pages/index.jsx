/*eslint-disable*/

import React from 'react';
import { useState } from 'react';
import ProductDescription from '../components/Description-Scott/ProductDescription';
import Comparison from '../components/Comparison-Dorien/Comparison';
import QAs from '../components/QAs-Malcolm/QAs';
import Reviews from '../components/Reviews-Jim/Reviews';

const App = () => {
  const [ productId, setProductId ] = useState(18201);

  return (
    <div>
      <ProductDescription />
      <Comparison />
      <QAs />
      <Reviews productId={productId} />
    </div>
  );
};

export default App;