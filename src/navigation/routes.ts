import HomeScreen from "../view/home/Home";
import MovieDetailsScreen from "../view/details/MovieDetails";

interface Route {
  name: string;
  component: any;
}

export default Route;

export const routes: Route[] = [
  { name: "Home", component: HomeScreen },
  { name: "MovieDetails", component: MovieDetailsScreen },
]