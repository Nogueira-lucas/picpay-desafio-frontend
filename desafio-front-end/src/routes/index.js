import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Template from '../components/Template.style'
import Login from '../components/pages/Login'
import Home from '../components/pages/Home'

const Routes = () => (
  <BrowserRouter>
    <Template>
      <Switch>
        <Route exact path='/' component={Login} />
        <Route exact path="/meus-pagamentos" component={Home}/>
      </Switch>
    </Template> 
  </BrowserRouter>
)

export default Routes