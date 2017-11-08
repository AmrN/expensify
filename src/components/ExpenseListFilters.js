import React from 'react';
import { connect } from 'react-redux';
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
} from '../actions/filters';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';


export class ExpenseListFilters extends React.Component {
  state = {
    calendarFocused: null,
  };

  handleDatesChange = ({ startDate, endDate }) => {
    const { setStartDate, setEndDate } = this.props;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  handleFocusChange = (calendarFocused) => {
    this.setState(() => ({
      calendarFocused,
    }))
  }

  handleTextChange = (e) => {
    this.props.setTextFilter(e.target.value)
  }

  handleSortChange = (e) => {
    e.target.value === 'createdAt' ? this.props.sortByDate() : this.props.sortByAmount()
  }

  render() {
    const {
      filters,
      setTextFilter,
      sortByAmount,
      sortByDate,
     } = this.props;

    return (
      <div>
        <input
          type="text"
          value={filters.text}
          onChange={this.handleTextChange} />

        <select
          value={filters.sortBy}
          onChange={this.handleSortChange}
        >
          <option value="createdAt">Date</option>
          <option value="amount">Amount</option>
        </select>

        <DateRangePicker
          startDate={filters.startDate}
          endDate={filters.endDate}
          onDatesChange={this.handleDatesChange}
          focusedInput={this.state.calendarFocused}
          onFocusChange={this.handleFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false}
          showClearDates
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  filters: state.filters,
});

export default connect(mapStateToProps, {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate
})(ExpenseListFilters);