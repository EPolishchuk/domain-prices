const normalize = (prices) => {
  let normalizedData = {};
  normalizedData.names = [];

  prices.map((el) => {
    if (el.hasOwnProperty('exchange') && el.exchange !== null) {
      el.registration =
        el.registrar === 'Regnames'
          ? (el.registration * el.exchange * 1.2).toFixed(2)
          : (el.registration * el.exchange).toFixed(2);
    }

    if (normalizedData.hasOwnProperty(el.domain)) {
      normalizedData[el.domain].push(el);
    } else {
      normalizedData[el.domain] = [];
      normalizedData.names.push(el.domain);
      normalizedData[el.domain] = [];
      normalizedData[el.domain].push(el);
    }
  });

  return normalizedData;
};

module.exports = normalize;
