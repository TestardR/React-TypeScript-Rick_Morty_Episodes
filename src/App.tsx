import React, { Fragment, useContext, useReducer } from "react";
import { Store } from "./Store";

interface Iaction {
  type: string
  payload: number
}

const App: React.FC = () => {
  const reducer = (state: number, action: Iaction): number => {
    switch (action.type) {
      case "ADD":
        return state + 1;
      case "SUB":
        return state - 1;
      case "RES":
        return (state = 0);
      default:
        return state;
    }
  };

  // @ts-ignore: Unreachable code error
  const [count, dispatch] = useReducer(reducer, 0);

  const store = useContext(Store);
  console.log(store);

  return (
    <Fragment>
      <h1>Rick and Morty</h1>
      <p>Pick your favourite episode !</p>
      <div>{count}</div>
      <button onClick={() => dispatch({type: 'ADD', payload: 0})}>ADD</button>
      <button onClick={() => dispatch({type: 'SUB', payload: 0})}>SUB</button>
      <button onClick={() => dispatch({type: 'RES', payload: 0})}>RES</button>
    </Fragment>
  );
};

export default App;
