import React, { Fragment, useContext, useEffect } from "react";
import { Store } from "./Store";
import { IEpisode, IAction } from "./interfaces";

const App: React.FC = () => {
  const { state, dispatch } = useContext(Store);
  useEffect(() => {
    state.episodes.length === 0 && fetchDataAction();
  });

  const fetchDataAction = async () => {
    const URL =
      "http://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";
    const data = await fetch(URL);
    const dataJSON = await data.json();

    return dispatch({
      type: "FETCH_DATA",
      payload: dataJSON._embedded.episodes
    });
  };

  const toggleFavAction = (episode: IEpisode): IAction => {
    const episodeInFav = state.favourites.includes(episode);
    let dispatchObject = {
      type: "ADD_FAV",
      payload: episode
    };
    if (episodeInFav) {
      console.log("INSIDE episode in Fav");
      const favWithoutEpisode = state.favourites.filter(
        (fav: IEpisode) => fav.id !== episode.id
      );
      dispatchObject = {
        type: "REMOVE_FAV",
        payload: favWithoutEpisode
      };
    }
    return dispatch(dispatchObject);
  };

  return (
    <Fragment>
      <header>
        <h1>Rick and Morty</h1>
        <p>Pick your favourite episode !</p>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode: IEpisode) => (
          <section key={episode.id} className="episode-box">
            {episode.image && <img src={episode.image.medium}></img>}
            <div> {episode.name}</div>
            <section>
              <div>
                Season: {episode.season} | Number: {episode.number}
              </div>

              <button type="button" onClick={() => toggleFavAction(episode)}>
                {state.favourites.find((fav: IEpisode) => fav.id === episode.id)
                  ? "Unfav"
                  : "Fav"}
              </button>
            </section>
          </section>
        ))}
      </section>
    </Fragment>
  );
};

export default App;
