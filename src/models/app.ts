import { Tab } from "../util/constants";

interface AppState {
  tab: Tab;
  page: number;
  favourites: number[];
}

const initAppState: AppState = {
  tab: Tab.UPCOMING,
  page: 1,
  favourites: [],
};

export { type AppState, initAppState }