require('dotenv').config({ path: '../.env.local' });

const axios = require('axios');
const pool = require('../db/db');

const MAIN_CURRENCY = ['EUR', 'USD', 'UAH'];
const TODAY = `${new Date().getDate}.${new Date().getMonth + 1}.${
  new Date().getFullYear
}`;

/*
  API always return an error on a first run,
  that's why we'll run function again to get
  actual result — or actual error
*/

const fetchRates = async (firstTry) => {
  let res;
  try {
    res = await axios.get(process.env.RATES_URL);
  } catch (error) {
    console.log(`Error connecting to API: ${error.message}. 
    ${firstTry ? 'Trying again...' : ''}`);
    if (firstTry) {
      return fetchRates(false);
    } else {
      return null;
    }
  }

  return res.data;
};

const getRates = async () => {
  const rates = await fetchRates(true);
  rates.filter((el) =>
    MAIN_CURRENCY.includes(el.cc) ? updateCurrency(el) : ''
  );
  return rates;
};

const updateCurrency = async (rate) => {
  rate.exchangedate = rate.exchangedate.split('.').reverse().join('-');

  try {
    const getCurrency = await pool.query(
      'SELECT * FROM currency WHERE name = $1',
      [rate.cc]
    );

    const result = getCurrency.rows;

    if (!result.length || checkDate(rate.exchangedate, result[0].date)) {
      try {
        let currencyId = rate.cc;
        const newCurrency = await pool.query(
          `INSERT INTO currency (currency_id, name, rate, date) VALUES ($1, $2, $3, $4) 
          ON CONFLICT (currency_id) 
          DO
            UPDATE SET rate = $3, date = $4
          RETURNING *`,
          [rate.cc, rate.txt, rate.rate, rate.exchangedate]
        );
      } catch (error) {
        console.log(
          `INSERT failed on currency ${rate.cc} with error ${error.message}`
        );
      }
    }
  } catch (error) {
    console.log(
      `SELECT failed on currency ${rate.cc} with error ${error.message}`
    );
  }
};

const checkDate = (updated, current) => {
  updated = new Date(updated);
  current = new Date(current);
  return updated.getTime() > current.getTime();
};

module.exports = getRates;
