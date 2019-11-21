import React, { Fragment, useContext, useEffect, lazy, Suspense } from "react";
import { Store } from "./Store";
import { IEpisode, IAction } from "./interfaces";

const EpisodesList = lazy<any>(() => import("./EpisodesList"));

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

  const props = {
    episodes: state.episodes,
    toggleFavAction,
    favourites: state.favourites
  };

  return (
    <Fragment>
      <header>
        <h1>Rick and Morty</h1>
        <div>
          <p>Pick your favourite episode !</p>
          <p>You have {state.favourites.length} favourites</p>
        </div>
      </header>
      <Suspense fallback={<div>loading...</div>}>
        <section className="episode-layout">
          <EpisodesList {...props} />
        </section>
      </Suspense>
    </Fragment>
  );
};

export default App;
