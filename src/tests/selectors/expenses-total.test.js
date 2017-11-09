import expensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expenses', () => {
  const result = expensesTotal([]);
  expect(result).toBe(0);
});

test('should correctly add up a single expense', () => {
  const result = expensesTotal([expenses[0]]);
  expect(result).toBe(expenses[0].amount);
});

test('should correctly add up multiple expenses', () => {
  const result = expensesTotal([expenses[0], expenses[1]]);
  expect(result).toBe(expenses[0].amount + expenses[1].amount);
});