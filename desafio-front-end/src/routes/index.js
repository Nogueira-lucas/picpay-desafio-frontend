import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from '../components/pages/Login'
import Home from '../components/pages/Home'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route exact path="/meus-pagamentos" component={Home}/>
    </Switch> 
  </BrowserRouter>
)

export default Routes