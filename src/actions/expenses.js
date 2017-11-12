// import uuid from 'uuid';
import database from '../firebase/firebase';

export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const removeExpense = id => ({
  type: 'REMOVE_EXPENSE',
  id,
});

export const editExpense = (id, expense) => ({
  type: 'EDIT_EXPENSE',
  id,
  expense,
});


export const setExpenses = expenses => ({
  type: 'SET_EXPENSES',
  expenses,
});

export const startSetExpenses = () => (dispatch, getState) => {
  const { uid } = getState().auth;
  return database.ref(`users/${uid}/expenses`)
    .once('value')
    .then((snapshot) => {
      let expenses = snapshot.val() || {};
      expenses = Object.keys(expenses).map(id => ({ id, ...expenses[id] }));
      return dispatch(setExpenses(expenses));
    });
};

export const startAddExpense = (expenseData = {}) => (dispatch, getState) => {
  const {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0,
  } = expenseData;

  const expense = {
    description, note, amount, createdAt,
  };

  const { uid } = getState().auth;

  return database.ref(`users/${uid}/expenses`).push(expense).then((ref) => {
    dispatch(addExpense({
      id: ref.key,
      ...expense,
    }));
  });
};

export const startRemoveExpense = id => (dispatch, getState) => {
  const { uid } = getState().auth;

  return database.ref(`users/${uid}/expenses/${id}`)
    .remove()
    .then(() => {
      dispatch(removeExpense(id));
    })
    .catch(e => console.log('Removing expense faild: ', e));
};

export const startEditExpense = (id, newExpense) => (dispatch, getState) => {
  const { uid } = getState().auth;
  return database.ref(`users/${uid}/expenses/${id}`)
    .update(newExpense)
    .then(() => {
      dispatch(editExpense(id, newExpense));
    })
    .catch(e => console.log('Updated expense failed: ', e));
};
