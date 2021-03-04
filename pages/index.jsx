import React, { useState } from 'react';
import ProductDescription from '../components/Description-Scott/ProductDescription';
import Comparison from '../components/Comparison-Dorien/Comparison';
import QAs from '../components/QAs-Malcolm/QAs';
import Reviews from '../components/Reviews-Jim/Reviews';

const App = () => {
  const [productId, setProductId] = useState(18078);
  // 18079 has no photos and is out of stock - good for testing

  return (
    <div className="App">
      <ProductDescription productId={productId} />
      <Comparison productId={productId} setProductId={setProductId} />
      <QAs productId={productId} />
      <Reviews productId="18201" />
    </div>
  );
};

export default App;
