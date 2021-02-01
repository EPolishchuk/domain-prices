import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import punycode from 'punycode/';
import sm from './style.module.scss';

const Price = (props) => {
  const [prices, setPrices] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE}/${process.env.REACT_APP_PRICE}/${props.match.params.name}`
      );
      const result = res.data;
      if (typeof result === 'object' && result.names.length === 0) {
        setPrices(false);
      } else {
        setPrices(result);
      }
    };

    fetch();
  }, [props.match.params.name]);

  console.log(prices);

  if (prices === false) {
    return <h2>This domain doesn't exist.</h2>;
  } else if (typeof prices !== 'object' || prices === null) {
    return <h2>Loading...</h2>;
  } else
    return (
      <div>
        <h1>Domain {props.match.params.name.toUpperCase()}</h1>
        <table className='table table-hover text-nowrap'>
          <tbody>
            <tr>
              <th>Registrar</th>
              <th>Price</th>
            </tr>
            {prices[prices.names[0]].map((el) => (
              <tr>
                <td>{el.registrar}</td>
                <td>{el.registration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Price;
