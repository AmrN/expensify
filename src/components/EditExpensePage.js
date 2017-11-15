import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { startEditExpense, startRemoveExpense } from '../actions/expenses';
import Modal from 'react-modal';

export class EditExpensePage extends React.Component {
  state = {
    removeDialogOpened: false,
  }

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

  openConfirmationDialog = () => {
    this.setState(() => ({
      removeDialogOpened: true,
    }));
  }

  closeConfirmationDialog = () => {
    this.setState(() => ({
      removeDialogOpened: false,
    }));
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
            onClick={this.openConfirmationDialog}
            className="button button--danger"
          >
            Remove Expense
          </button>
        </div>
        <Modal
          isOpen={this.state.removeDialogOpened}
          className={{
            base: 'dialog',
            afterOpen: 'dialog--after-open',
            beforeClose: 'dialog--before-close',
          }}
          overlayClassName={{
            base: 'dialog-overlay',
            afterOpen: 'dialog-overlay--after-open',
            beforeClose: 'dialog-overlay--before-close',
          }}
        >
          <h1 className="dialog-title">Remove this expense?</h1>
          <div className="dialog-actions">
            <button
              onClick={this.handleRemoveExpense}
              className="button dialog-actions__action"
            >
              Okay
            </button>
            <button
              onClick={this.closeConfirmationDialog}
              className="button button--secondary dialog-actions__action"
            >
              Cancel
            </button>
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  expense: state.expenses.find(el => el.id === ownProps.match.params.id),
});

export default connect(mapStateToProps, { startEditExpense, startRemoveExpense })(EditExpensePage);
