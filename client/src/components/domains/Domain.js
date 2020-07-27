import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Badge from './Badge';
import sm from './styles.modules.scss';
import punycode from 'punycode';

const Domain = (props) => {
  const [domain, setDomain] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE}/${process.env.REACT_APP_SINGLE_DOMAIN}/${props.match.params.name}`
      );

      setDomain(res.data[0]);
    };

    fetch();
  }, []);

  if (typeof domain !== 'object' || domain === null) {
    return <h2>Loading...</h2>;
  } else
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-12'>
            <h2>Domain {domain.name}</h2>
          </div>
          <div className='col'>
            <h6>Features: </h6>
            {domain.newtld ? <Badge text='nTLD' /> : ''}
            {domain.idn_support ? <Badge text='IDN' /> : ''}
            {domain.privacy ? <Badge text='WHOIS Privacy' /> : ''}
            {domain.dnssec_support ? <Badge text='DNSSEC' /> : ''}
            {domain.ipv6_support ? <Badge text='IPv6' /> : ''}
          </div>
        </div>
        {domain.created && (
          <div className='row'>
            <div className='col'>
              <p>
                <i>
                  {' '}
                  Domain was created at {domain.created}. Last update in root
                  zone at {domain.updated}
                </i>
              </p>
              <p>
                <h4>Domain created by</h4>
                <p>
                  {domain.creator_data.map((el, i) => (
                    <p className={`contact ${i === 0 ? 'first' : ''}`}>{el}</p>
                  ))}
                </p>
              </p>
              <p>
                <h4>Administrative contact</h4>
                <p>
                  {domain.admin_data.map((el, i) => (
                    <p className={`contact ${i === 0 ? 'first' : ''}`}>{el}</p>
                  ))}
                </p>
              </p>
              <p>
                <h4>Techical support by</h4>
                <p>
                  {domain.tech_data.map((el, i) => (
                    <p className={`contact ${i === 0 ? 'first' : ''}`}>{el}</p>
                  ))}
                </p>
              </p>
              <p>
                <h4>Core nameservers:</h4>
                <table className='table table-hover text-nowrap'>
                  <thead>
                    <tr>
                      <th>Host</th>
                      <th>IP</th>
                    </tr>
                  </thead>
                  <tbody>
                    {domain['core_ns'].map((el) => (
                      <tr>
                        <td>{el.host}</td>
                        <td>
                          {el.ip.map((el) => (
                            <p>{el}</p>
                          ))}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </p>
            </div>
          </div>
        )}
      </div>
    );
};

export default Domain;
