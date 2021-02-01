import React, { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import punycode from 'punycode/';
import Badge from './Badge';

const Domains = () => {
  const [domains, setDomains] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE}/${process.env.REACT_APP_DOMAINS}`
      );

      setDomains(res.data);
    };

    fetch();
  }, []);

  if (!Array.isArray(domains)) {
    return <h2>Loading...</h2>;
  } else
    return (
      <div>
        <h2>Domains</h2>
        <table className='table table-hover text-nowrap'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>IDN characters</th>
              <th>Privacy</th>
              <th>DNSSEC</th>
              <th>IPv6</th>
            </tr>
          </thead>

          <tbody>
            {domains.map((domain, i) => (
              <tr key={i}>
                <td>
                  <NavLink exact to={`/domain/${domain.name}`}>
                    {!domain.name.includes('xn--')
                      ? domain.name
                      : punycode.toUnicode(domain.name)}
                  </NavLink>
                </td>
                {domain.created === null && !domain.name.includes('.') ? (
                  <td colSpan='5'>
                    This domain is not present in the root zone at this time.
                  </td>
                ) : (
                  <Fragment>
                    <td>{domain.newtld ? <Badge text='nTLD' /> : ''}</td>
                    <td>{domain.idn_support ? <Badge text='IDN' /> : ''}</td>
                    <td>
                      {domain.privacy ? <Badge text='WHOIS Privacy' /> : ''}
                    </td>
                    <td>
                      {domain.dnssec_support ? <Badge text='DNSSEC' /> : ''}
                    </td>
                    <td>{domain.ipv6_support ? <Badge text='IPv6' /> : ''}</td>
                  </Fragment>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
};

export default Domains;
