import React, { useState } from 'react';
import ProductDescription from '../components/Description-Scott/ProductDescription';
import Comparison from '../components/Comparison-Dorien/Comparison';
import QAs from '../components/QAs-Malcolm/QAs';
import Reviews from '../components/Reviews-Jim/Reviews';

const App = () => {
  const [productId, setProductId] = useState(18078); // eslint-disable-line no-unused-vars

  return (
    <div>
      <ProductDescription productId={productId} />
      <Comparison productId={productId}/>
      <QAs productId={productId} />
      <Reviews productId={productId} />
    </div>
  );
};

export default App;
