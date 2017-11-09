import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let historySpy, editExpenseSpy, removeExpenseSpy, expense, wrapper;
beforeEach(() => {
  historySpy = {
    push: jest.fn(),
  };
  removeExpenseSpy = jest.fn();
  editExpenseSpy = jest.fn();
  expense = expenses[0];
  wrapper = shallow(
    <EditExpensePage
      editExpense={editExpenseSpy}
      removeExpense={removeExpenseSpy}
      history={historySpy}
      expense={expense}
    />
  );
})

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
  wrapper.find('button').simulate('click');
  expect(removeExpenseSpy).toHaveBeenCalledWith(expense.id);
  expect(historySpy.push).toHaveBeenCalledWith('/');
});