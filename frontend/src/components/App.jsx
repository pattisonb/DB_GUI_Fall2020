import './App.css';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Navbar from './layout/Navbar';
import Landing from './Landing';
import Home from './Home';
import Register from './auth/Register';
import Login from './auth/Login';
import Alert from './layout/Alert';
import Error from './Error';
const getLogged = () => {
  let id = window.localStorage.getItem('id');
  console.log(id);
  return id;
};
function App() {
  return (
    <>
      <div>
        <Router>
          <Switch>
            <Route path='/' exact component={Landing}>
              {getLogged() ? <Redirect to='/home' /> : null}
            </Route>
            <Route path='/login' exact component={Login} />
            <Route path='/home' exact component={Home}>
              {!(getLogged() >= 0) && <Redirect to='/' />}
            </Route>
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
