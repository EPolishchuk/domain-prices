import React, { useState, useEffect } from 'react';
import axios from 'axios';
import punycode from 'punycode';

const Registrar = (props) => {
  const [registrar, setRegistrar] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE}/${process.env.REACT_APP_REGISTRAR}/${props.match.params.name}`
      );

      setRegistrar(res.data[0]);
    };

    fetch();
  }, []);

  if (typeof registrar !== 'object' || registrar === null) {
    return <h2>Loading...</h2>;
  } else
    return (
      <div className='container'>
        <div className='row'>
          <div className='col'>
            <h2>{registrar.name}</h2>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <p>
              <a href={registrar.url} target='_blank' rel='noopener noreferrer'>
                Website
              </a>
            </p>
          </div>
        </div>
      </div>
    );
};

export default Registrar;
