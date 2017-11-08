import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configure-store';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import 'react-dates/lib/css/_datepicker.css';

import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';

const store = configureStore();

store.dispatch(addExpense({ description: 'water bill', amount: 1000, createdAt: 900 }));
store.dispatch(addExpense({ description: 'gas bill', amount: 400, createdAt: 400 }));
store.dispatch(addExpense({ description: 'rent', amount: 109500, createdAt: -1000 }));

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));