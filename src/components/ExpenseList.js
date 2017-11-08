import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/expenses';

export const ExpenseList = ({ expenses }) => (
  <div>
    {
      expenses.length === 0
        ?
        <p>No Expenses</p>
        :
        expenses.map(expense => (
          <ExpenseListItem
            key={expense.id}
            {...expense}
          />
        ))
    }
  </div>
);

const mapStateToProps = (state) => ({
  expenses: getVisibleExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);
