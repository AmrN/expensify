import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let historySpy,
  startEditExpenseSpy,
  startRemoveExpenseSpy,
  expense,
  wrapper;

beforeEach(() => {
  historySpy = {
    push: jest.fn(),
  };
  startRemoveExpenseSpy = jest.fn();
  startEditExpenseSpy = jest.fn();
  [expense] = expenses;
  wrapper = shallow(<EditExpensePage
    startEditExpense={startEditExpenseSpy}
    startRemoveExpense={startRemoveExpenseSpy}
    history={historySpy}
    expense={expense}
  />);
});

test('should render EditExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle expense form submit', () => {
  const updatedExpense = {
    ...expenses[0],
    description: 'updated',
  };
  const startEditExpensePromise = Promise.resolve();
  startEditExpenseSpy.mockReturnValueOnce(startEditExpensePromise);
  wrapper.find('ExpenseForm').simulate('submit', updatedExpense);
  expect(startEditExpenseSpy).toHaveBeenCalledWith(updatedExpense.id, updatedExpense);

  return startEditExpensePromise.then(() => {
    expect(historySpy.push).toHaveBeenCalledWith('/');
  });
});

test('should handle removing expense', () => {
  const startRemoveExpensePromise = Promise.resolve();
  startRemoveExpenseSpy.mockReturnValueOnce(startRemoveExpensePromise);

  wrapper.find('button').simulate('click');

  expect(startRemoveExpenseSpy).toHaveBeenCalledWith(expense.id);
  return startRemoveExpensePromise.then(() => {
    expect(historySpy.push).toHaveBeenCalledWith('/');
  });
});
