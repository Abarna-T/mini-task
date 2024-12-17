import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserTable from './UserTable';
import LoginForm from './LoginForm';



function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route path="/user-list" component={UserTable} />
      </Switch>
    </Router>
  );
}

export default App;
