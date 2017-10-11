import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
const rootReducer = combineReducers({
 form: form, //we can just write form (Es6)
});

export default rootReducer;
