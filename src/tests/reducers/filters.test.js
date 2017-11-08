import filtersReducer from '../../reducers/filters';
import moment from 'moment';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    sortBy: 'amount',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
  });
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, {
    type: 'SORT_BY_AMOUNT',
  })
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const currentState = { 
    text: '',
    sortBy: 'amount',
    startDate: undefined,
    endDate: undefined,
  };
  const action = { type: 'SORT_BY_DATE' };
  const state = filtersReducer(currentState, action);
  expect(state.sortBy).toBe('createdAt');
});

test('should set text filter', () => {
  const state = filtersReducer(undefined, {
    type: 'SET_TEXT_FILTER',
    text: 'coffee',
  });
  expect(state.text).toBe('coffee');
});

test('should set startDate filter', () => {
  const date = moment();
  const state = filtersReducer(undefined, {
    type: 'SET_START_DATE',
    date,
  });
  expect(state.startDate).toBe(date);

});

test('should set endDate filter', () => {
  const date = moment();
  const state = filtersReducer(undefined, {
    type: 'SET_END_DATE',
    date,
  });
  expect(state.endDate).toBe(date);
});