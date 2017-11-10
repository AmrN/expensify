import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import database from '../../firebase/firebase';
import expenses from '../fixtures/expenses';


const createMockStore = configureMockStore([thunk]);

// eslint-disable-next-line no-undef
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

test('Should setup remove expense action object', () => {
  const action = removeExpense('123abc');
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc',
  });
});

test('Should setup edit expense action object', () => {
  const expenseData = {
    description: 'water bill',
    amount: 123,
    note: '',
    createdAt: 1000,
  };
  const action = editExpense('123abc', expenseData);
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    expense: { ...expenseData },
  });
});

test('should setup add expense action object with provided values', () => {
  const action = addExpense(expenses[0]);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[0],
  });
});

test('should add expense to database and store', () => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'this is better',
    createdAt: 1000,
  };
  return store.dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...expenseData,
        },
      });

      return database.ref(`expenses/${actions[0].expense.id}`);
    })
    .then((ref) => {
      ref.once('value')
        .then((snapshot) => {
          const savedExpense = snapshot.val();

          expect(savedExpense).toEqual(expenseData);
        });
    });
});

test('should add expense with defaults to database and store', () => {
  const store = createMockStore({});
  const defaultExpense = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0,
  };

  return store.dispatch(startAddExpense())
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
          id: expect.any(String),
          ...defaultExpense,
        },
      });

      return database.ref(`expenses/${actions[0].expense.id}`);
    })
    .then((ref) => {
      ref.once('value')
        .then((snapshot) => {
          const savedExpense = snapshot.val();

          expect(savedExpense).toEqual(defaultExpense);
        });
    });
});

