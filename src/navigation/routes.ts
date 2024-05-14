import MovieDetailsScreen from "screens/details/MovieDetails";
import HomeScreen from "screens/home/Home";
import Route from "types/route";

export const routes: Route[] = [
  { name: "Home", component: HomeScreen },
  { name: "MovieDetails", component: MovieDetailsScreen },
]