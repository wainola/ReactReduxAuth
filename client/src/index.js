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

import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
            <BrowserRouter>
                <div>
                    <Header />
                    <Route exact path='/' component={App} />
                    <Route path='/signin' component={Signin} />
                    <Route path='/signout' component={Signout} />  
                    <Route path='/signup' component={Signup} />
                </div>
            </BrowserRouter>
    </Provider>, 
    document.getElementById('root'));
registerServiceWorker();
