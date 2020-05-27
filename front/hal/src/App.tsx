import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/Header'
import { Moim, Friend, Chat, MyInfo } from './routes'
import MoimContainer from './containers/MoimContainer'

function App() {
  // return <CounterContainer />
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={MoimContainer} />
          <Route path="/friend" component={Friend} />
          <Route path="/chat" component={Chat} />
          <Route path="/myInfo" component={MyInfo} />
          <Redirect path="*" to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
