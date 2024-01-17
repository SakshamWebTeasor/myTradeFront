import React, { useReducer, useState } from "react";

type Props = {};

const ACTION = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
};

function ButtonReducerIncDec({}: Props) {
  // const [value, setValue] = useState(0);
  function increment () {
    // setValue(prevValue => prevValue + 1);
    dispatch({ type: ACTION.INCREMENT });
  }
  function decrement () {
    // setValue(prevValue => prevValue - 1);
    dispatch({ type: ACTION.DECREMENT });
  }

  const reducer = (state: any, action: any) => {
    switch (action.type) {
      case ACTION.DECREMENT:
        return { ...state, counter: state.counter - 1 };
      case ACTION.INCREMENT:
        return { ...state, counter: state.counter + 1 };
      default:
        return state;
    }
  }
  const [state, dispatch] = useReducer(reducer, { counter: 0});
  return (
    <div>
      <button className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={decrement}>
        -
      </button>
      {/* <span className="font-bold px-1">{value}</span> */}
      <span className="font-bold px-1">{state.counter}</span>
      <button className="text-white bg-red-500 hover:bg-red-700 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={increment}>
        +
      </button>
    </div>
  );
}

export default ButtonReducerIncDec;
