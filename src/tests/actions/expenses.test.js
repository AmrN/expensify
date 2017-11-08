import { addExpense, editExpense, removeExpense } from '../../actions/expenses';

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
  const expenseData = {
    description: 'water bill',
    amount: 123,
    note: "this was last month's rent",
    createdAt: 1000,
  };

  const action = addExpense(expenseData);

  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: { 
      ...expenseData,
      id: expect.any(String),
     },
  });
});

test('should setup add expense action object with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0,
    }
  })
});