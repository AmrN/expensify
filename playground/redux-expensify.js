import { createStore, combineReducers } from 'redux';
import uuid from 'uuid';

// actions
const addExpense = ({
  description = '',
  note = '',
  amount = 0,
  createdAt = 0,
} = {}) => ({
    type: 'ADD_EXPENSE',
    expense: {
      id: uuid(),
      description,
      note,
      amount,
      createdAt,
    }
  });

const removeExpense = (id) => ({
  type: 'REMOVE_EXPENSE',
  id,
});

const editExpense = (id, expense) => ({
  type: 'EDIT_EXPENSE',
  id,
  expense
});

const expensesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense,
      ];
    case 'REMOVE_EXPENSE':
      const itemIndex = state.findIndex((el) => el.id === action.id);
      return state.filter((el) => el.id !== action.id);
    // return [
    //   ...state.slice(0, itemIndex),
    //   ...state.slice(itemIndex + 1),
    // ];
    case 'EDIT_EXPENSE':
      const expenseIndex = state.findIndex((el) => el.id === action.id);
      return state.map((el) => el.id === action.id ? { ...el, ...action.expense } : el);
    // return [
    //   ...state.slice(0, expenseIndex),
    //   {...state[expenseIndex], ...action.expense},
    //   ...state.slice(expenseIndex+1),
    // ];
    default:
      return state;
      break;
  }
};

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text,
});

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
});

const sortByDate = () => ({
  type: 'SORT_BY_DATE',
});

const setStartDate = (date) => ({
  type: 'SET_START_DATE',
  date,
});

const setEndDate = (date) => ({
  type: 'SET_END_DATE',
  date,
});

const filtersDefaultState = {
  text: '',
  sortBy: 'amount',
  startDate: undefined,
  endDate: undefined,
};

const filtersReducer = (state = filtersDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text,
      };
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'createdAt',
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.date,
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.date,
      }
    default:
      return state;
      break;
  }
};

// get visible expenses
const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate }) => {
  const res = expenses.filter((el) => {
    const startDateMatch = typeof startDate !== 'number' || startDate <= el.createdAt,
      endDateMatch = typeof endDate !== 'number' || endDate >= el.createdAt,
      textMatch = typeof text !== 'string' || el.description.toLowerCase().includes(text.toLowerCase());

    return startDateMatch && endDateMatch && textMatch;
  });
  return res.sort((a, b) => a[sortBy] > b[sortBy] ? -1 : 1)
};

const rootReducer = combineReducers({
  expenses: expensesReducer,
  filters: filtersReducer,
});

const store = createStore(rootReducer);
store.subscribe(() => {
  const state = store.getState();
  const visibleExpenses = getVisibleExpenses(state.expenses, state.filters);
  console.log(visibleExpenses);
  // console.log(store.getState());
});

const expense1 = store.dispatch(addExpense({ description: 'rent', amount: 1000, createdAt: 300 }));
const expense2 = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: -1000 }));
const expense3 = store.dispatch(addExpense({ description: 'car', amount: 500, createdAt: 600 }));

// store.dispatch(removeExpense(expense1.expense.id));
// store.dispatch(editExpense(expense2.expense.id, {
//   description: 'updated',
//   amount: '10usd',
// }));

// store.dispatch(setTextFilter('rent'));

// store.dispatch(sortByDate());
// store.dispatch(sortByAmount());

// store.dispatch(setStartDate(-1000));
// store.dispatch(setEndDate(0));
// store.dispatch(setTextFilter('fFeE'));
store.dispatch(sortByAmount());
store.dispatch(sortByDate());
// store.dispatch(setStartDate());
// store.dispatch(setEndDate());
const demoState = {
  expenses: [{
    id: '123123',
    description: 'January Rent',
    note: 'This was the final payment for that address',
    amount: 54000,
    createdAt: 0,
  }],
  filters: {
    text: 'rent',
    sortBy: 'amount', // date or amount
    startDate: undefined,
    endDate: undefined,
  }
};