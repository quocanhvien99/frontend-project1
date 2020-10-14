import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { NotificationContainer } from 'react-notifications';
import ProtectedRoute from './routes/ProtectedRoute';
import Home from './routes/Home';
import Login from './routes/Login';
import Register from './routes/Register';
import Private from './routes/Private';
import 'react-notifications/lib/notifications.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <ProtectedRoute exact path="/private" component={Private} />
        </Switch>
        <NotificationContainer />
      </div>
    </Router>
  );
}

export default App;
