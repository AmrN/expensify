import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter, { history } from './routers/AppRouter';
import configureStore from './store/configure-store';

import 'normalize.css/normalize.css';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';

import { startSetExpenses } from './actions/expenses';
import { login, logout } from './actions/auth';

import { firebase } from './firebase/firebase';

import './firebase/firebase';

import LoadingPage from './components/LoadingPage';

const store = configureStore();

let hasRendered = false;
const renderApp = (Root) => {
  const jsx = (
    <Provider store={store}>
      <Root />
    </Provider>
  );
  ReactDOM.render(jsx, document.getElementById('app'));
};

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(login(user.uid));
    store.dispatch(startSetExpenses())
      .then(() => {
        if (!hasRendered) {
          renderApp(AppRouter);
          hasRendered = true;
        }
      });
  } else {
    store.dispatch(logout());
    if (!hasRendered) {
      renderApp(AppRouter);
      hasRendered = true;
    }
  }
});

ReactDOM.render(<LoadingPage />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('./routers/AppRouter', () => {
    // const Root = require('./routers/AppRouter').default;

    renderApp(AppRouter);
  });
}
