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
