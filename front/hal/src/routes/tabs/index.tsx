import React from 'react'

import friend from './Friend'
import chat from './Chat'
import myInfo from './MyInfo'
import moim from './Moim'

import Header from '../../components/Header'
import Nav from '../../components/Nav'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import MoimContainer from '../../containers/MoimContainer'

const index = () => {
  return (
    <div>
      <Router>
        <Header />
        <Nav />
        <Switch>
          <Route path="/moim" exact component={MoimContainer} />
          <Route path="/friend" component={friend} />
          <Route path="/chat" component={chat} />
          <Route path="/myInfo" component={myInfo} />
          <Redirect path="*" to="/moim" />
        </Switch>
      </Router>
    </div>
  )
}
export { index, moim, friend, chat, myInfo }
