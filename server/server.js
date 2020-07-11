require('dotenv').config({ path: '../.env.local' });

const express = require('express');
const cors = require('cors');
const app = express();

const pool = require('./db');

app.use(cors());
app.use(express.json());

/*
  ROUTES START
*/

//get all
app.get('/domains', async (req, res) => {
  try {
    const allDomains = await pool.query('SELECT * FROM domains');

    res.json(allDomains.rows);
  } catch (error) {
    res.status(500).send({ error: "Couldn't get your data, sorry" });
    console.log(error.message);
  }
});

app.get('/registrars', async (req, res) => {
  try {
    const allRegistrars = await pool.query(
      'SELECT * FROM registrars WHERE (registrar_id != $1 AND registrar_id != $2)',
      ['uadns', 'nic']
    );

    res.json(allRegistrars.rows);
  } catch (error) {
    res.status(500).send({ error: "Couldn't get your data, sorry" });
    console.log(error.message);
  }
});

app.get('/prices', async (req, res) => {
  try {
    const allPrices = await pool.query(
      'SELECT * FROM prices WHERE (registrar_id != $1 AND registrar_id != $2)',
      ['uadns', 'nic']
    );

    res.json(allPrices.rows);
  } catch (error) {
    res.status(500).send({ error: "Couldn't get your data, sorry" });
    console.log(error.message);
  }
});

app.get('/full', async (req, res) => {
  try {
    const allPrices = await pool.query(
      'SELECT prices.registrar_id, domains.name, prices.registration, prices.renewal, prices.transfer FROM prices JOIN domains ON domains.domain_id = prices.domain_id WHERE registrar_id!=$1 AND registrar_id!=$2 ORDER BY domains.name;',
      ['uadns', 'nic']
    );

    res.json(allPrices.rows);
  } catch (error) {
    res.status(500).send({ error: "Couldn't get your data, sorry" });
    console.log(error.message);
  }
});

app.get('/:invalid', async (req, res) => {
  const { invalid } = req.params;
  res.status(500).send({ error: "Couldn't get your data, sorry" });
});

/*
  ROUTES END
*/

app.listen(5000, () => {
  console.log('server has started on port 5000');
});
