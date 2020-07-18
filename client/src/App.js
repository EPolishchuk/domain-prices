import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import NotFound from './components/layout/NotFound';
import Prices from './components/prices/Prices';
import Price from './components/prices/Price';
import Registrars from './components/registrars/Registrars';
import Registrar from './components/registrars/Registrar';
import Domains from './components/domains/Domains';
import Domain from './components/domains/Domain';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route exact path='/' component={Prices} />
            <Route exact path='/registrars' component={Registrars} />
            <Route exact path='/domains' component={Domains} />
            <Route exact path='/price/:name' component={Price} />
            <Route exact path='/registrar/:name' component={Registrar} />
            <Route exact path='/domain/:name' component={Domain} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
