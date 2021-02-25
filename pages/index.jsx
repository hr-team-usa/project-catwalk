import React from 'react';
import ProductDescription from '../components/Description-Scott/ProductDescription';
import Comparison from '../components/Comparison-Dorien/Comparison';
import QAs from '../components/QAs-Malcolm/QAs';
import Reviews from '../components/Reviews-Jim/Reviews';

const App = () => (
  <div>
    <ProductDescription />
    <Comparison />
    <QAs />
    <Reviews />
  </div>
);

export default App;

/*
//THIS IS OUR HELLO API CODE, LEAVING IT HERE FOR FUTURE REFERENCE

import React, { useState, useEffect } from 'react';

import axios from 'axios';
import config from '../config';

const Hello = () => {
  const [response, setResponse] = useState([]);

  const getAllFromProducts = () => {
    const options = {
      url: 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-bld/products',
      method: 'get',
      headers: {
        Authorization: config.TOKEN,
      },
    };

    axios(options)
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => { console.log(err); });
  };

  useEffect(() => {
    getAllFromProducts();
  }, []);

  return (
    <div>
      {response.map((item, i) => <h3 index={i}>{item.name}</h3>)}
    </div>
  );
};

export default Hello;
*/
