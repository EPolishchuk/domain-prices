require('dotenv').config({ path: '../.env.local' });

const express = require('express');
const pool = require('../db/config');
const router = express.Router();

router.get('/domains', async (req, res) => {
  try {
    const allDomains = await pool.query(
      `SELECT name, popular, newtld, gtld, cc, privacy, idn_support, dnssec_support, ipv6_support 
      FROM domains 
      WHERE created IS NOT NULL
      ORDER BY name`
    );

    res.json(allDomains.rows);
  } catch (error) {
    res.status(500).send({ error: "Couldn't get your data, sorry" });
    console.log(error.message);
  }
});

router.get('/domain/:zone', async (req, res) => {
  try {
    const domain = await pool.query(
      `SELECT d.name, d.newtld, d.idn_support, d.privacy, 
    d.dnssec_support, d.ipv6_support, d.created, d.updated, 
    d.core_ns, cc.contact_data as creator_data, ca.contact_data as admin_data,
    ct.contact_data as tech_data
    FROM domains d
    LEFT join domain_contacts cc on cc.domain_contact_id = d.creator_id
    LEFT join domain_contacts ca on ca.domain_contact_id = d.admin_id
    LEFT join domain_contacts ct on ct.domain_contact_id = d.tech_id
    WHERE name=$1`,
      [req.params.zone]
    );

    res.json(domain.rows);
  } catch (error) {
    res.status(500).send({ error: "Couldn't get your data, sorry" });
    console.log(error.message);
  }
});

module.exports = router;
