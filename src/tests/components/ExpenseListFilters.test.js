import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';
import moment from 'moment';
import { DateRangePicker } from 'react-dates';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setTextFilter = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();

  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({ filters: altFilters });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const input = wrapper.find('input').at(0);
  input.simulate('change', {
    target: { value: 'coffee' },
  });
  expect(setTextFilter).toHaveBeenCalledWith('coffee');
});

test('should sort by date', () => {
  const selectInput = wrapper.find('select');
  selectInput.simulate('change', {
    target: { value: 'createdAt' },
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
  const selectInput = wrapper.find('select');
  selectInput.simulate('change', {
    target: { value: 'amount' },
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date changes', () => {
  const datePicker = wrapper.find(DateRangePicker);
  
  const startDate = moment(1000),
        endDate = moment(2000)
  datePicker.prop('onDatesChange')({
    startDate,
    endDate,
  });
  expect(setStartDate).toHaveBeenCalledWith(startDate);
  expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test('should handle date focus changes', () => {
  const datePicker = wrapper.find(DateRangePicker);
  
  datePicker.prop('onFocusChange')('startDate');
  expect(wrapper.state('calendarFocused')).toBe('startDate');
  datePicker.prop('onFocusChange')('endDate');
  expect(wrapper.state('calendarFocused')).toBe('endDate');
});