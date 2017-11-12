import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import getVisibleExpenses from '../selectors/expenses';

export const ExpenseList = ({ expenses }) => (
  <div className="content-container">
    <div className="list-header">
      <div className="show-mobile">Expenses</div>
      <div className="show-desktop">Expense</div>
      <div className="show-desktop">Amount</div>
    </div>
    <div className="list-body">
      {
        expenses.length === 0
          ?
            <div className="list-item list-item--message">
              <span>No Expenses</span>
            </div>
          :
          expenses.map(expense => (
            <ExpenseListItem
              key={expense.id}
              {...expense}
            />
          ))
      }
    </div>
  </div>
);

const mapStateToProps = state => ({
  expenses: getVisibleExpenses(state.expenses, state.filters),
});

export default connect(mapStateToProps)(ExpenseList);
