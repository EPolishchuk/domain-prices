import React, { useState, useEffect } from 'react';
import PriceRow from './PriceRow';
import PricesFilter from './PricesFilter';
import axios from 'axios';
import sm from './style.module.scss';

const Prices = () => {
  const [prices, setPrices] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE}/${process.env.REACT_APP_REGISTRATION_PRICES}`
      );

      setPrices(res.data);
    };

    fetch();
  }, []);

  if (typeof prices !== 'object' || prices === null) {
    return <h2>Loading...</h2>;
  } else
    return (
      <div>
        <h2>Best price for your next domain</h2>
        <div className='container'>
          <div className='row'>
            <div className='col-3'>
              <PricesFilter />
            </div>
            <div className='col-9'>
              <table className='table table-hover text-nowrap'>
                <thead>
                  <tr>
                    <th>Domain</th>
                    <th className={sm.cheapest}>Cheapest</th>
                    <th>Not so cheap</th>
                    <th className={sm.last}>Holy cow</th>
                  </tr>
                </thead>

                <tbody>
                  {prices.names.map(
                    (name, i) =>
                      prices[name].length > 2 && (
                        <PriceRow key={i + name} prices={prices[name]} />
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Prices;
