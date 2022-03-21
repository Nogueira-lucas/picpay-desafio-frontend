import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import { SignIn } from '../pages/SignIn';
import { Home } from '../pages/Home';
import { Account } from '../pages/Account';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={SignIn} />
    <Route path="/tasks" component={Home} isPrivate />
    <Route path="/account" exact component={Account} isPrivate />
  </Switch>
);

export default Routes;
