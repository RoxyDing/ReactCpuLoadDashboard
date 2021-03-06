import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';

import NotFoundPage from './components/NotFoundPage';

import DashboardPage  from './components/DashboardPage';

import ReduxPromise from 'redux-promise'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise,reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

ReactDOM.render(
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={App} >
            <IndexRoute component={DashboardPage} />
            <Route path='*' component={NotFoundPage} />
          </Route>
        </Router>
      </Provider>
    , document.querySelector('#main'));
