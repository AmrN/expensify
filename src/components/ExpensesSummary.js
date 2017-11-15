import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from '../selectors/expenses-total';
import numeral from 'numeral';
import { clearFilters } from '../actions/filters';

const getExpensesWord = count => `expense${count === 1 ? '' : 's'}`;

export const ExpensesSummary = ({
  expensesCount,
  expensesTotal,
  hiddenExpensesCount,
  clearFilters,
}) => {
  const expensesTotalFormatted = numeral(expensesTotal / 100).format('$0,0.00');
  const expensesWord = getExpensesWord(expensesCount);
  const hiddenExpensesWord = getExpensesWord(hiddenExpensesCount);

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          Viewing <span>{expensesCount}</span> {expensesWord} totalling <span>{expensesTotalFormatted}</span>
        </h1>
        {
          hiddenExpensesCount > 0
          &&
          <div className="page-header__info">
            <p>Filters hiding <strong>{hiddenExpensesCount}</strong> {hiddenExpensesWord}</p>
          </div>
        }
        <div className="page-header__actions">
          <div className="page-header__actions__action">
            <Link
              to="/create"
              className="button"
            >
              Add Expense
            </Link>
          </div>

          {
            hiddenExpensesCount > 0
            &&
            <div className="page-header__actions__action">
              <button
                onClick={clearFilters}
                className="button button--link-reverse"
              >
                clear filters
              </button>
            </div>
          }
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
    hiddenExpensesCount: state.expenses.length - visibleExpenses.length,
  };
};

export default connect(mapStateToProps, {
  clearFilters,
})(ExpensesSummary);
