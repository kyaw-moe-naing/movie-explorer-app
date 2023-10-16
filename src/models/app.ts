import { Tab, UIStatus } from "../util/constants";
import { Movie } from "./movie";

interface AppState {
  tab: Tab;
  page: number;
  listUI: UIStatus;
  movies: Movie[];
  detailsUI: UIStatus;
  movie: Movie | undefined;
  error: string | undefined;
  favourites: number[];
}

const initAppState: AppState = {
  tab: Tab.UPCOMING,
  page: 1,
  listUI: UIStatus.IDLE,
  movies: [],
  detailsUI: UIStatus.IDLE,
  movie: undefined,
  error: undefined,
  favourites: []
};

export { type AppState, initAppState }