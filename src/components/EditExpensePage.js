import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { editExpense, removeExpense } from '../actions/expenses';

export class EditExpensePage extends React.Component {
  handleExpenseFormSubmit = (updatedExpense) => {
    this.props.editExpense(updatedExpense.id, updatedExpense);
    this.props.history.push('/');
  }

  handleRemoveExpense = () => {
    this.props.removeExpense(this.props.expense.id);
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <ExpenseForm
          expense={this.props.expense}
          onSubmit={this.handleExpenseFormSubmit}
        />
        <button onClick={this.handleRemoveExpense}>remove</button>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  expense: state.expenses.find((el) => el.id === ownProps.match.params.id),
});

export default connect(mapStateToProps, { editExpense, removeExpense })(EditExpensePage);