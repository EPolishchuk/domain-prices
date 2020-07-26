import React from 'react';

const styles = {
  nTLD: { style: 'ntld', desc: 'This is a new TLD zone' },
  IDN: { style: 'idn', desc: 'You can use IDN characters in domain name' },
  'WHOIS Privacy': {
    style: 'privacy',
    desc: 'You can hide your contact information from public WHOIS',
  },
  DNSSEC: { style: 'dnssec', desc: 'Domain zone support DNSSEC records' },
  IPv6: { style: 'ipv6', desc: 'Domain zone support IPv6 addresses' },
};

const Badge = (props) => {
  return (
    <div
      className={`btn badge ${styles[props.text].style}`}
      title={styles[props.text].desc}
    >
      {props.text}
    </div>
  );
};

export default Badge;
