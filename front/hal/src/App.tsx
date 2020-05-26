import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { index } from './routes/tabs'
import Main from './routes/Main'
import Register from './routes/Register'
import Login from './routes/Login'
import Login_face from './routes/Login_face'

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Main}></Route>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/login_face" component={Login_face} />
          <Route path="/moim" component={index} />
          <Redirect path="*" to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
