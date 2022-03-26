import React from "react"
import Routes from './routes'
import { Router } from 'react-router-dom'
import { createBrowserHistory } from 'history'

const customHistory = createBrowserHistory({ basename: '/' })
customHistory.listen(location => {
  window.ineum('page', location.pathname)
})

const App = () => {
  return (
    <Router history={customHistory}>
      <Routes />
    </Router>
  )
}

export default App
