import React from 'react';
import { shallow } from 'enzyme';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import expenses from '../fixtures/expenses';

test('should render ExpensesSummary correctly when passing multiple expenses', () => {
  const wrapper = shallow(
    <ExpensesSummary
      expensesCount={3}
      expensesTotal={3000} />
  );
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpensesSummary correctly when passing a single expense', () => {
  const wrapper = shallow(
    <ExpensesSummary
      expensesCount={1}
      expensesTotal={1000} />
  );
  expect(wrapper).toMatchSnapshot();
});