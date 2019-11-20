/**
|--------------------------------------------------
| All the interfaces
|--------------------------------------------------
*/

export interface IState {
  episodes: Array<IEpisode>;
  favourites: Array<IEpisode>;
}

export interface IAction {
  type: string;
  payload: any;
}

export interface IEpisode {
  id: number;
  name: string;
  image: { medium: string };
  season: string;
  number: number;
}
