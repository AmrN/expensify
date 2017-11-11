const expensesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [
        ...state,
        action.expense,
      ];
    case 'REMOVE_EXPENSE':
      return state.filter(el => el.id !== action.id);
    // return [
    //   ...state.slice(0, itemIndex),
    //   ...state.slice(itemIndex + 1),
    // ];
    case 'EDIT_EXPENSE':
      return state.map(el => (el.id === action.id ? { ...el, ...action.expense } : el));
    // return [
    //   ...state.slice(0, expenseIndex),
    //   {...state[expenseIndex], ...action.expense},
    //   ...state.slice(expenseIndex+1),
    // ];
    case 'SET_EXPENSES':
      return [...action.expenses];
    default:
      return state;
  }
};

export default expensesReducer;
