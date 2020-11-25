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
import ProductDetails from './product/ProductDetails';
import Register from './auth/Register';
import Login from './auth/Login';
import Alert from './layout/Alert';
import Error from './Error';
import { Contacts } from './messaging/Contacts';
import Chat from './messaging/Chat/Chat';
import UserProfile from './user/UserProfile';
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
                    {/* {window.localStorage.getItem('id') === null && <Redirect to='/' />} */}
                    <Switch>
                        <Route path='/' exact component={Landing}></Route>
                        <Route path='/login' exact component={Login} />
                        <Route path='/home' exact component={Home}></Route>
                        <Route
                            path='/products/:productId'
                            exact
                            component={ProductDetails}
                        ></Route>
                        <Route path='/chat' exact component={Chat}></Route>
                        <Route component={Error} />
                    </Switch>
                </Router>
            </div>
        </>
    );
}

export default App;
