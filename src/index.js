import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import App from './components/app';
import RequireAuth from './components/require_auth';
import Signin from './components/auth/signin';
import Signup from './components/auth/signup';
import Signout from './components/auth/signout'
import Feature from './components/feature';
import reducers from './reducers';
import { AUTH_USER } from './actions/types';
/*
  add <IndexRoute  component= {first}/>
*/
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const token = localStorage.getItem('token');
var store = createStoreWithMiddleware(reducers)
if(token) {
  store.dispatch({ type: AUTH_USER })
}
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={App}>
        <Route path='/signin' component={Signin} /> 
        <Route path='/signout' component={Signout} /> 
        <Route path='/signup' component={Signup} /> 
        <Route path='/feature' component={RequireAuth(Feature)} /> 
      </Route>
    </Router>
  </Provider>
  , document.querySelector('.container'));
