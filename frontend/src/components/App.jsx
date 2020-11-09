import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Navbar from './layout/Navbar';
import Landing from './Landing';
import Register from './auth/Register';
import Login from './auth/Login';
import Alert from './layout/Alert';

function App() {
    return (
        <div>
            <Router>
                <Route path='/' exact component={Landing} />
                <Route path='/login' exact component={Login} />
            </Router>
        </div>
    );
}

export default App;
