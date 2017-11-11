import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set default state', () => {
  const state = expensesReducer(undefined, {
    type: '@@INIT',
  });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([
    expenses[0],
    expenses[2],
  ]);
});

test('should not remove expense if id is not found', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: 'does not exists',
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense', () => {
  const expense = {
    id: 123123,
    description: 'coffee',
    amount: 1000,
    note: '',
    createdAt: 100,
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('should edit an expense', () => {
  const updatedExpense = {
    description: 'coffee',
    amount: 1000,
    note: '',
    createdAt: 100,
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[1].id,
    expense: updatedExpense,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], { ...expenses[1], ...updatedExpense }, expenses[2]]);
});

test('should not edit expense if expense not found', () => {
  const updatedExpense = {
    description: 'coffee',
    amount: 1000,
    note: '',
    createdAt: 100,
  };
  const action = {
    type: 'EDIT_EXPENSE',
    id: 'does not exist',
    expense: updatedExpense,
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should set expenses', () => {
  const newExpenses = [
    {
      id: 1,
      description: 'first one',
      amount: 1222,
    },
    {
      id: 2,
      description: 'second one',
      amount: 3000,
    },
  ];
  const result = expensesReducer(expenses, {
    type: 'SET_EXPENSES',
    expenses: newExpenses,
  });

  expect(result).toEqual(newExpenses);
});

