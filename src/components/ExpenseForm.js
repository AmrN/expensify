import React from 'react';
import moment from 'moment';
import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    const { expense = {} } = props;
    this.state = {
      description: expense.description ? expense.description : '',
      amount: expense.amount ? (expense.amount / 100).toString() : '',
      note: expense.note ? expense.note : '',
      createdAt: expense.createdAt ? moment(expense.createdAt) : moment(),
      focusedCalendarInput: false,
      error: null,
    };
  }


  handleDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({
      description,
    }));
  }

  handleAmountChange = (e) => {
    const amount = e.target.value.trim();
    if (!amount || amount.match(/^\d+(\.\d{0,2})?$/)) {
      this.setState(() => ({
        amount,
      }));
    }
  }

  handleNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({
      note,
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      this.setState(() => ({
        error: 'Please provide description and amount',
      }));
    } else {
      this.setState(() => ({
        error: null,
      }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      });
    }
  }

  handleDateChange = (date) => {
    date && this.setState({ createdAt: date });
  }

  handleFocusChange = ({ focused }) => {
    this.setState({
      focusedCalendarInput: focused,
    });
  }

  render() {
    return (
      <form
        onSubmit={this.handleSubmit}
        className="form"
      >
        {this.state.error &&
          <p className="form__error">
            {this.state.error}
          </p>
        }

        <input
          type="text"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleDescriptionChange}
          autoFocus
          className="text-input"
        />
        <input
          type="text"
          placeholder="Amount"
          value={this.state.amount}
          onChange={this.handleAmountChange}
          className="text-input"
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.handleDateChange}
          focused={this.state.focusedCalendarInput}
          onFocusChange={this.handleFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
        />
        <textarea
          placeholder="Add a note for your expense (optional)"
          value={this.state.note}
          onChange={this.handleNoteChange}
          className="textarea"
        />
        <button className="button">
          Save Expense
        </button>
      </form>
    );
  }
}

export default ExpenseForm;
