import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './auth_reducer';
const rootReducer = combineReducers({
 form: form, //we can just write /form/ (Es6)
 auth:authReducer
});

export default rootReducer;
