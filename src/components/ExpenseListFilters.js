import React from 'react';
import { connect } from 'react-redux';
import {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
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
    }));
  }

  handleTextChange = (e) => {
    this.props.setTextFilter(e.target.value);
  }

  handleSortChange = (e) => {
    e.target.value === 'createdAt' ? this.props.sortByDate() : this.props.sortByAmount();
  }

  render() {
    const {
      filters,
      setTextFilter,
      sortByAmount,
      sortByDate,
    } = this.props;

    return (
      <div className="content-container">

        <div className="input-group">
          <div className="input-group__item">
            <input
              type="text"
              value={filters.text}
              onChange={this.handleTextChange}
              placeholder="Search Expenses"
              className="text-input"
            />
          </div>

          <div className="input-group__item">
            <select
              value={filters.sortBy}
              onChange={this.handleSortChange}
              className="select"
            >
              <option value="createdAt">Date</option>
              <option value="amount">Amount</option>
            </select>
          </div>

          <div className="input-group__item">
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
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  filters: state.filters,
});

export default connect(mapStateToProps, {
  setTextFilter,
  sortByAmount,
  sortByDate,
  setStartDate,
  setEndDate,
})(ExpenseListFilters);
