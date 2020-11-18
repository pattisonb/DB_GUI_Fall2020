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
import { Contacts } from './messaging/Contacts';
import Chat from './messaging/Chat/Chat';
const getLogged = () => {
  let id = window.localStorage.getItem('id');
  console.log(id);
  return id;
};
function App() {
  return (
    // <>
    //   <Router>
    //     <Route path='/chat' exact component={Chat} />
    //   </Router>
    // </>
    <>
      <div>
        <Router>
          <Switch>
            <Route path='/' exact component={Landing}>
              {getLogged() && getLogged() >= 0 ? <Redirect to='/home' /> : null}
            </Route>
            <Route path='/login' exact component={Login} />
            <Route path='/home' exact component={Home}>
              {!(getLogged() >= 0) && getLogged() !== false && (
                <Redirect to='/' />
              )}
            </Route>
            <Route path='/chat' exact component={Chat}>
              {!getLogged() && <Redirect to='/' />}
            </Route>
            <Route component={Error} />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
