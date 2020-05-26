import React from 'react'
// import CounterContainer from './containers/CounterContainer'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { moim, friend, chat, myInfo } from './routes/index'
import Header from './components/Header'

function App() {
  // return <CounterContainer />
  return (
    <Router>
      <div>
        <Header />
        <Switch>
          <Route path="/" exact component={moim} />
          <Route path="/friend" component={friend} />
          <Route path="/chat" component={chat} />
          <Route path="/myInfo" component={myInfo} />
          <Redirect path="*" to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
