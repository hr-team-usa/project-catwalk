import React, { useState } from 'react';
import ProductDescription from '../components/Description-Scott/ProductDescription';
import Comparison from '../components/Comparison-Dorien/Comparison';
import QAs from '../components/QAs-Malcolm/QAs';
import Reviews from '../components/Reviews-Jim/Reviews';

const App = () => {
  const [productId, setProductId] = useState(18078);
<<<<<<< HEAD
  const [productRating, setProductRating] = useState(null);
=======
  // 18079 has no photos and is out of stock - good for testing
>>>>>>> 1627a99a8a7f6216b2850ad637f465b78ba54253

  return (
    <div className="App">
      <ProductDescription productId={productId} productRating={productRating} />
      <Comparison productId={productId} setProductId={setProductId} />
      <QAs productId="18201" />
      <Reviews productId="18201" setProductRating={setProductRating} />
    </div>
  );
};

export default App;
