require('dotenv').config({ path: '../.env.local' });

const express = require('express');
const pool = require('../db/config');
const normalize = require('../utils/normalize');
const getRates = require('./rates');
const router = express.Router();

router.get('/prices/registration', async (req, res) => {
  try {
    const createPrices = await pool.query(
      `SELECT prices.price_id, currency.rate AS exchange, registrars.name AS registrar, 
      domains.name AS domain, prices.registration  
      FROM prices 
      INNER JOIN domains ON domains.domain_id=prices.domain_id 
      INNER JOIN registrars ON registrars.registrar_id = prices.registrar_id 
      INNER JOIN currency ON registrars.currency_id = currency.currency_id
      WHERE registrars.registrar_id != $1 AND registrars.registrar_id != $2
      AND registrars.registrar_id != $3
      ORDER BY domains.popular, domains.name;`,
      ['uadns', 'nic', 'regnames']
    );

    res.json(normalize(createPrices.rows));
  } catch (error) {
    res.status(500).send({ error: "Couldn't get your data, sorry" });
    console.log(error.message);
  }
});

router.get('/price/:domain', async (req, res) => {
  try {
    const createPrices = await pool.query(
      `SELECT prices.price_id, currency.rate AS exchange, registrars.name AS registrar, 
      domains.name AS domain, prices.registration  
      FROM prices 
      INNER JOIN domains ON domains.domain_id=prices.domain_id 
      INNER JOIN registrars ON registrars.registrar_id = prices.registrar_id 
      INNER JOIN currency ON registrars.currency_id = currency.currency_id
      WHERE registrars.registrar_id != $1 AND registrars.registrar_id != $2
      AND registrars.registrar_id != $3 AND domains.name = $4
      ORDER BY prices.registration;`,
      ['uadns', 'nic', 'regnames', req.params.domain]
    );

    res.json(normalize(createPrices.rows));
  } catch (error) {
    res.status(500).send({ error: "Couldn't get your data, sorry" });
    console.log(error.message);
  }
});

router.get('/rates', async (req, res) => {
  try {
    const allRates = await pool.query('SELECT * FROM currency');

    let result = allRates.rows;

    if (Array.isArray(result) && result.length === 0) {
      result = await getRates();
    } else {
      let usd = result.filter((el) => el.currency_id === 'USD')[0];
      if (new Date() > new Date(usd.date)) {
        await getRates();
        result = await pool.query('SELECT * FROM currency');
      }
    }

    res.json(allRates.rows);
  } catch (error) {
    res.status(500).send({ error: "Couldn't get your data, sorry" });
    console.log(error.message);
  }
});

module.exports = router;
