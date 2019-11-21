import React, { Fragment } from "react";
import { IEpisode } from "./interfaces";

export default function EpisodesList(props: any) {
  const { toggleFavAction, episodes, favourites } = props;
  return (
    <Fragment>
      {episodes.map((episode: IEpisode) => (
        <section key={episode.id} className="episode-box">
          {episode.image && (
            <img src={episode.image.medium} alt={episode.name}></img>
          )}
          <div> {episode.name}</div>
          <section style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              Season: {episode.season} | Number: {episode.number}
            </div>

            <button type="button" onClick={() => toggleFavAction(episode)}>
              {favourites.find((fav: IEpisode) => fav.id === episode.id)
                ? "Unfav"
                : "Fav"}
            </button>
          </section>
        </section>
      ))}
    </Fragment>
  );
};

