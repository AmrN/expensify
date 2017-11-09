import moment from 'moment';

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  const res = expenses.filter((expense) => {
    const createdAtMoment = moment(expense.createdAt);
    const startDateMatch = startDate ? startDate.isSameOrBefore(expense.createdAt, 'day') : true,
      endDateMatch = endDate ? endDate.isSameOrAfter(expense.createdAt, 'day') : true,
      textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  });
  return res.sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1)
};

export default getVisibleExpenses;