import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import reduxThunk from 'redux-thunk';
import Header from './components/header';

import Signin from './components/auth/signin';
import Signout from './components/auth/signout';
import Signup from './components/auth/signup';
import Feature from './components/feature';
import {PrivateRoute} from './components/auth/require_auth';

import reducers from './reducers';
import { AUTH_USER } from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('token');

if(token){
    store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
    <Provider store={store}>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path='/' component={App} />
                    <Route path='/signin' component={Signin} />
                    <Route path='/signout' component={Signout} />  
                    <Route path='/signup' component={Signup} />
                    <PrivateRoute path="/feature" component={Feature}/>
                </div>
            </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
