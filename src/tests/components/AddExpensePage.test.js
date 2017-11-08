import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { AddExpensePage } from '../../components/AddExpensePage';

test('should render AddExpensePage correctly', () => {
  const wrapper = shallow(<AddExpensePage />);
  expect(wrapper).toMatchSnapshot();
});

test('should call addExpense with expense when handleSubmit is called', () => {
  const expense = {
    description: 'coffee',
    amount: 123123,
  };
  const addExpenseSpy = jest.fn();
  const wrapper = shallow(
    <AddExpensePage
      addExpense={addExpenseSpy}
      history={{ push: () => { } }}
    />
  );
  wrapper.instance().handleSubmit(expense);
  expect(addExpenseSpy).toHaveBeenCalledWith(expense);
});

test('should go to home when handleSubmit is called', () => {
  const historyPushSpy = jest.fn();
  const wrapper = shallow(
    <AddExpensePage
      addExpense={() => { }}
      history={{ push: historyPushSpy }}
    />
  );
  wrapper.instance().handleSubmit();
  expect(historyPushSpy).toHaveBeenCalledWith('/');
});