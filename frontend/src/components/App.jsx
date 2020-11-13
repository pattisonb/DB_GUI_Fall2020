import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './layout/Navbar';
import Landing from './Landing';
import Home from './Home';
import Register from './auth/Register';
import Login from './auth/Login';
import Alert from './layout/Alert';
import Error from './Error';

function App() {
    return (
    <>
        <div>
            <Router>
                <Switch>
                    <Route path='/' exact component={Landing} />
                    <Route path='/login' exact component={Login} />
                    <Route path='/home' exact component={Home} />
                    <Route component={Error}/>
                </Switch>
            </Router>
        </div>
    </>
    );
}

export default App;
