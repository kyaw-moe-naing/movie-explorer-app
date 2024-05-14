interface AppState {
  favourites: number[];
}

const initAppState: AppState = {
  favourites: [],
};

export { type AppState, initAppState }