import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { index } from './routes/tabs'
import Main from './components/Main'
import Register from './components/Register/Register'
import Login_face from './components/Login/Login_face'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Main}></Route>
          <Route path="/register" component={Register} />
          <Route path="/login_face" component={Login_face} />
          <Route path="/moim" component={index} />      
          <Route path="/friend" component={index} />
          <Route path="/chat" component={index} />
          <Route path="/myInfo" component={index} />
          <Route path="/ProfileUpdate" component={index} />
          <Redirect path="*" to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
