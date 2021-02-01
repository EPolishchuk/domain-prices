import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sm from './style.module.scss';

function PricesFilter() {
  const [registrars, setRegistrars] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE}/${process.env.REACT_APP_REGISTRARS}`
      );

      setRegistrars(res.data);
    };

    fetch();
  }, []);

  if (!Array.isArray(registrars)) {
    return <h2>Loading...</h2>;
  } else
    return (
      <div className={sm.filterWrap}>
        <div className={sm.filterBlock}>
          <h5 className={sm.filterName}>Type:</h5>
          <p>
            <input type='checkbox' /> Ukrainian domains
          </p>
          <p>
            <input type='checkbox' /> gTLD domains
          </p>
          <p>
            <input type='checkbox' /> nTLD domains
          </p>
          <p>
            <input type='checkbox' /> country domains
          </p>
        </div>
        <div className={sm.filterBlock}>
          <h5 className={sm.filterName}>Price:</h5>
          <p>
            <input type='checkbox' /> less then 100 UAH
          </p>
          <p>
            <input type='checkbox' /> 100 - 349 UAH
          </p>
          <p>
            <input type='checkbox' /> 350 UAH and more
          </p>
          <p>
            <input type='text' className={sm.price} /> -{' '}
            <input type='text' className={sm.price} />
          </p>
        </div>
        <div className={sm.filterBlock}>
          <h5 className={sm.filterName}>Registrar:</h5>
          {registrars.map((el) => (
            <p>
              <input type='checkbox' /> {el.name}{' '}
            </p>
          ))}
        </div>
      </div>
    );
}

export default PricesFilter;
