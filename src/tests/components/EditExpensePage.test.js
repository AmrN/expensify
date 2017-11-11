import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let historySpy,
  editExpenseSpy,
  startRemoveExpenseSpy,
  expense,
  wrapper;

beforeEach(() => {
  historySpy = {
    push: jest.fn(),
  };
  startRemoveExpenseSpy = jest.fn();
  editExpenseSpy = jest.fn();
  [expense] = expenses;
  wrapper = shallow(<EditExpensePage
    editExpense={editExpenseSpy}
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

  wrapper.find('ExpenseForm').simulate('submit', updatedExpense);
  expect(editExpenseSpy).toHaveBeenCalledWith(updatedExpense.id, updatedExpense);
  expect(historySpy.push).toHaveBeenCalledWith('/');
});

test('should handle removing expense', () => {
  const startRemoveExpensePromise = Promise.resolve();
  startRemoveExpenseSpy.mockReturnValue(startRemoveExpensePromise);

  wrapper.find('button').simulate('click');

  expect(startRemoveExpenseSpy).toHaveBeenCalledWith(expense.id);
  return startRemoveExpensePromise.then(() => {
    expect(historySpy.push).toHaveBeenCalledWith('/');
  });
});
