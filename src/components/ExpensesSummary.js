import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';

export const ExpensesSummary = ({ expensesCount, expensesTotal }) => {
  const expensesWord = `expense${expensesCount === 1 ? '' : 's'}`;
  const expensesTotalFormatted = numeral(expensesTotal / 100).format('$0,0.00');

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expensesCount}</span> {expensesWord} totalling <span>{expensesTotalFormatted}</span>
        </h1>
        <div className="page-header__actions">
          <Link
            to="/create"
            className="button"
          >
            Add Expense
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  return {
    expensesCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses),
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
