import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  handleExpenseFormSubmit = (updatedExpense) => {
    this.props.startEditExpense(this.props.expense.id, updatedExpense)
      .then(() => {
        this.props.history.push('/');
      });
  }

  handleRemoveExpense = () => {
    this.props.startRemoveExpense(this.props.expense.id)
      .then(() => {
        this.props.history.push('/');
      });
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">
              Edit Expense
            </h1>
          </div>
        </div>
        <div className="content-container">
          <ExpenseForm
            expense={this.props.expense}
            onSubmit={this.handleExpenseFormSubmit}
          />
          <button
            onClick={this.handleRemoveExpense}
            className="button button--secondary"
          >
            Remove Expense
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  expense: state.expenses.find(el => el.id === ownProps.match.params.id),
});

export default connect(mapStateToProps, { startEditExpense, startRemoveExpense })(EditExpensePage);
