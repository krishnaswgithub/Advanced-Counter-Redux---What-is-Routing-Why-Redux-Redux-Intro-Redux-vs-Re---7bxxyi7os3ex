// import React from 'react';

// function App() {

//   return (
//     <div id='main'>
      
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

// Action Types
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const INCREMENTBYAMOUNT = 'INCREMENTBYAMOUNT';
const SIGN_IN = 'SIGN_IN';
const SIGN_OUT = 'SIGN_OUT';

// Action Creators
const increment = () => ({ type: INCREMENT });
const decrement = () => ({ type: DECREMENT });
const incrementByAmount = (amount) => ({ type: INCREMENTBYAMOUNT, payload: amount });
const signIn = () => ({ type: SIGN_IN });
const signOut = () => ({ type: SIGN_OUT });

// Reducer
const initialState = {
  counter: 0,
  isLogged: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, counter: state.counter + 1 };
    case DECREMENT:
      return { ...state, counter: state.counter - 1 };
    case INCREMENTBYAMOUNT:
      return { ...state, counter: state.counter + action.payload };
    case SIGN_IN:
      return { ...state, isLogged: true };
    case SIGN_OUT:
      return { ...state, isLogged: false, counter: 0 };
    default:
      return state;
  }
};

const store = createStore(reducer);

function Counter() {
  const dispatch = useDispatch();
  const counter = useSelector((state) => state.counter);
  const isLogged = useSelector((state) => state.isLogged);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleAddAmount = () => {
    const amount = parseInt(document.getElementById('amountInput').value, 10);
    if (!isNaN(amount)) {
      dispatch(incrementByAmount(amount));
    }
  };

  const handleLogin = () => {
    dispatch(signIn());
  };

  const handleLogout = () => {
    dispatch(signOut());
  };

  return (
    <div>
      {isLogged && (
        <div>
          <h2 data-testid="counter">Counter: {counter}</h2>
          <button onClick={handleIncrement}>+</button>
          <button onClick={handleDecrement}>-</button>
          <input type="text" id="amountInput" defaultValue="2" />
          <button onClick={handleAddAmount}>Add amount</button>
          <br />
        </div>
      )}
      <button onClick={isLogged ? handleLogout : handleLogin}>{isLogged ? 'Logout' : 'Login'}</button>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <div id="main">
        <Counter />
      </div>
    </Provider>
  );
}

export default App;
