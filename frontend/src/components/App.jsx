import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import Navbar from './layout/Navbar';
import Landing from './Landing';
import Register from './auth/Register';
import Login from './auth/Login';

function App() {
    return (
        <div className='App'>
            <Router>
                <Route path='/' exact component={Landing} />
                <Route path='/login' exact component={Login} />
            </Router>
        </div>
    );
}

export default App;
