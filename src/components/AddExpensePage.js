import React from 'react';
import ExpenseForm from './ExpenseForm';
import { connect } from 'react-redux';
import { startAddExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  handleSubmit = (expense) => {
    this.props.startAddExpense(expense);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <h1>Add Expense</h1>
        <ExpenseForm
          onSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default connect(null, { startAddExpense })(AddExpensePage);
