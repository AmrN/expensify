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

export default expensesReducer;