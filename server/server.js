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
    const allDomains = await pool.query(
      'SELECT name, popular, newtld, gtld, cc, privacy, idn_support, dnssec_support, ipv6_support FROM domains ORDER BY name'
    );

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
      `SELECT prices.price_id, registrars.name AS registrar, domains.name AS domain, prices.registration, prices.renewal, prices.transfer 
      FROM prices 
      INNER JOIN domains ON domains.domain_id=prices.domain_id 
      INNER JOIN registrars ON registrars.registrar_id = prices.registrar_id 
      WHERE registrars.registrar_id != $1 AND registrars.registrar_id != $2 AND registrars.registrar_id != $3
      ORDER BY domains.popular, domains.name, prices.registration ASC;`,
      ['uadns', 'nic', 'regnames']
    );

    res.json(allPrices.rows);
  } catch (error) {
    res.status(500).send({ error: "Couldn't get your data, sorry" });
    console.log(error.message);
  }
});

//get single
app.get('/domain/:zone', async (req, res) => {
  try {
    const domain = await pool.query(
      `SELECT d.name, d.newtld, d.idn_support, d.privacy, 
    d.dnssec_support, d.ipv6_support, d.created, d.updated, 
    d.core_ns, cc.contact_data as creator_data, ca.contact_data as admin_data,
    ct.contact_data as tech_data
    FROM domains d
    inner join domain_contacts cc on cc.domain_contact_id = d.creator_id
    inner join domain_contacts ca on ca.domain_contact_id = d.admin_id
    inner join domain_contacts ct on ct.domain_contact_id = d.tech_id
    WHERE name=$1`,
      [req.params.zone]
    );

    res.json(domain.rows);
  } catch (error) {
    res.status(500).send({ error: "Couldn't get your data, sorry" });
    console.log(error.message);
  }
});

app.get('/:invalid', async (req, res) => {
  const { invalid } = req.params;
  res.status(404).send({ error: `Route /${invalid} not found` });
});

/*
  ROUTES END
*/

app.listen(5000, () => {
  console.log('server has started on port 5000');
});
