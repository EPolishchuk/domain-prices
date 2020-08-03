require('dotenv').config({ path: '../.env.local' });

const express = require('express');
const pool = require('../db/db');
const router = express.Router();

router.get('/registrars', async (req, res) => {
  try {
    const allRegistrars = await pool.query(
      'SELECT name, url, currency_id FROM registrars WHERE (registrar_id != $1 AND registrar_id != $2)',
      ['uadns', 'nic']
    );

    res.json(allRegistrars.rows);
  } catch (error) {
    res.status(500).send({ error: "Couldn't get your data, sorry" });
    console.log(error.message);
  }
});

router.get('/registrar/:name', async (req, res) => {
  try {
    const domain = await pool.query(
      'SELECT name, url, currency_id FROM registrars WHERE name=$1',
      [req.params.name]
    );

    res.json(domain.rows);
  } catch (error) {
    res.status(500).send({ error: "Couldn't get your data, sorry" });
    console.log(error.message);
  }
});

module.exports = router;
