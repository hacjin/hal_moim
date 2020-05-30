import React from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'
import { index } from './routes/tabs'
import Main from './routes/Main'
import Register from './routes/Register'
import Login from './routes/Login'
import Login_face from './routes/Login_face'
// import friend from './routes/tabs/friend'
// import chat from './routes/tabs/chat'
// import myInfo from './routes/tabs/myInfo'

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
          <Route path="/friend" component={index} />
          <Route path="/chat" component={index} />
          <Route path="/myInfo" component={index} />
          <Redirect path="*" to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
