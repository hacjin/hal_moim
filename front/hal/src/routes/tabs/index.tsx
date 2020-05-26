import React from 'react'

import friend from './friend'
import chat from './chat'
import myInfo from './myInfo'
import moim from './moim'

import Header from '../../components/Header'
import Nav from '../../components/Nav'

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

const index = () => {
    return (
        <div>
            <Router>
            <Header />
            <Nav />
                <Switch>
                <Route path="/moim" exact component={moim} />
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
