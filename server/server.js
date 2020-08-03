const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Registrars
const registrarRoutes = require('./routes/registrar');
app.use(registrarRoutes);

// Domains
const domainRoutes = require('./routes/domain');
app.use(domainRoutes);

// Prices
const priceRoutes = require('./routes/price');
app.use(priceRoutes);

//Errors
app.get('/*', async (req, res) => {
  res.status(404).send({ error: `Route ${req.originalUrl} not found` });
});

app.listen(5000, () => {
  console.log('server has started on port 5000');
});
