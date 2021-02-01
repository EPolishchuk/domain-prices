import React, { useState, useEffect, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Registrars = () => {
  const [registrars, setRegistrars] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_BASE}/${process.env.REACT_APP_REGISTRARS}`
      );

      setRegistrars(res.data);
    };

    fetch();
  }, []);

  if (!Array.isArray(registrars)) {
    return <h2>Loading...</h2>;
  } else
    return (
      <Fragment>
        <div className='row'>
          <div className='col'>
            <h2>What registrars we are including:</h2>
          </div>
        </div>
        <div className='row'>
          {registrars.map((el) => (
            <div className='col'>
              <h4>{el.name}</h4>
              <p>
                <a href={el.url} target='_blank' rel='noopener noreferrer'>
                  {el.url}
                </a>
              </p>
              <p>
                <NavLink exact to={`registrar/${el.name}`}>
                  Learn more{' '}
                  <svg
                    width='1em'
                    height='1em'
                    viewBox='0 0 16 16'
                    className='bi bi-arrow-right-square-fill'
                    fill='currentColor'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm5.646 10.646a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L9.793 7.5H5a.5.5 0 0 0 0 1h4.793l-2.147 2.146z'
                    />
                  </svg>
                </NavLink>
              </p>
            </div>
          ))}
        </div>
      </Fragment>
    );
};

export default Registrars;
