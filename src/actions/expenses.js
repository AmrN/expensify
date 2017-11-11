// import uuid from 'uuid';
import database from '../firebase/firebase';

export const addExpense = expense => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const startAddExpense = (expenseData = {}) => (dispatch) => {
  const {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0,
  } = expenseData;

  const expense = {
    description, note, amount, createdAt,
  };

  return database.ref('expenses').push(expense).then((ref) => {
    dispatch(addExpense({
      id: ref.key,
      ...expense,
    }));
  });
};

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

export const startSetExpenses = () => dispatch => database.ref('expenses')
  .once('value')
  .then((snapshot) => {
    let expenses = snapshot.val() || {};
    expenses = Object.keys(expenses).map(id => ({ id, ...expenses[id] }));
    return dispatch(setExpenses(expenses));
  });

export const startRemoveExpense = id => dispatch => database.ref(`expenses/${id}`)
  .remove()
  .then(() => {
    dispatch(removeExpense(id));
  })
  .catch(e => console.log('Removing expense faild: ', e));

