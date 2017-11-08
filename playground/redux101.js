import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
  type: 'INCREMENT',
  incrementBy,
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
  type: 'DECREMENT',
  decrementBy,
});

const resetCount = () => ({
  type: 'RESET',
});

const setCount = (count) => ({
  type: 'SET',
  count,
});

const countReducer = (state = { count: 0 }, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy,
      };
    case 'DECREMENT':
      return {
        count: state.count - decrementBy,
      };
    case 'RESET':
      return {
        count: 0,
      };
    case 'SET':
      return {
        count: action.count,
      }
    default:
      return state;
  }
};

const store = createStore(countReducer);

store.subscribe(() => {
  const state = store.getState();
  console.log(`Store updated, count = ${state.count}`);
});


// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 0,
// });
store.dispatch(incrementCount({ incrementBy: 5 }));

// store.dispatch({
//   type: 'RESET',
// });

// store.dispatch({
//   type: 'DECREMENT',
//   decrementBy: 10,
// });

// store.dispatch({
//   type: 'INCREMENT',
//   incrementBy: 3,
// });

// store.dispatch({
//   type: 'SET', 
//   count: 66,
// });
