import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';

const rootReducer = combineReducers({
    // using es6 magic!
    form,
    auth: authReducer
});

export default rootReducer;