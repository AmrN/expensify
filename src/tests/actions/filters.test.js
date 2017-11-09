import moment from 'moment';
import { 
  setTextFilter,
  setStartDate,
  setEndDate,
  sortByAmount,
  sortByDate,
} from '../../actions/filters';

test('should generate set start date action object', () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: 'SET_START_DATE',
    date: moment(0),
  });
});

test('should generate set end date action object', () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: 'SET_END_DATE',
    date: moment(0),
  });
});

test('should generate set text filter action object with default value', () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER', 
    text: '',
  });
});

test('should generate set text filter action object with passed value', () => {
  const action = setTextFilter('coffee');
  expect(action).toEqual({
    type: 'SET_TEXT_FILTER',
    text: 'coffee',
  });
});

test('should generate sort by amount test object', () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: 'SORT_BY_AMOUNT', 
  });
});

test('should generate sort by date test object', () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: 'SORT_BY_DATE', 
  });
});

