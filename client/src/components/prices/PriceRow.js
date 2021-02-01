import React from 'react';
import { NavLink } from 'react-router-dom';
import punycode from 'punycode/';
import sm from './style.module.scss';

function PriceRow(data) {
  const { prices } = data;
  const name = prices[0].domain;

  return (
    <tr>
      <td>
        <NavLink exact to={`/price/${name}`}>
          {!name.includes('xn--') ? name : punycode.toUnicode(name)}
        </NavLink>
      </td>
      {prices
        .sort(function (a, b) {
          return a.registration - b.registration;
        })
        .map((el, i) =>
          i < 3 ? (
            <td
              key={el.price_id}
              className={i === 0 ? sm.cheapest : i === 2 ? sm.last : ''}
            >
              <p>
                {el.registration}
                {i > 0 &&
                  ` (+${Math.round(
                    (el.registration / prices[0].registration) * 100 - 100
                  )}%)`}
              </p>
              <p>{el.registrar}</p>
            </td>
          ) : (
            ''
          )
        )}
    </tr>
  );
}

export default PriceRow;
