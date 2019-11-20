import React, { Fragment, useContext } from "react";
import { Store } from "./Store";

const App: React.FC = () => {
  const { state, dispatch } = useContext(Store);

  const fetchDataAction = async () => {
    const URL = 'https//api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes'
    const data = await fetch(URL);
    const dataJSON = await data.json();
    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON
    });
  };

  console.log(state)

  return (
    <Fragment>
      <h1>Rick and Morty</h1>
      <p>Pick your favourite episode !</p>
    </Fragment>
  );
};

export default App;
