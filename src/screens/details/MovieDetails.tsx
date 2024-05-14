import { useTheme, useRoute, RouteProp } from "@react-navigation/native";
import { useAppSelector, useAppDispatch } from "app/hook";
import { useGetMovieDetailsQuery } from "app/services/movie/movie";
import { getFavourites, addToFavourite, removeFromFavourite } from "app/slices/app";
import AppBar from "components/AppBar";
import IconButton from "components/IconButton";
import { HeartIcon } from "components/Icons";
import { RootStackParamList } from "navigation/containers/app";
import { View, Image, StatusBar, Platform, StyleSheet } from "react-native";
import { IMAGE_BASE_URL } from "utils/constants";
import Details from "./components/Details";

const MovieDetailsScreen = () => {
  const { colors } = useTheme();

  const route = useRoute<RouteProp<RootStackParamList, 'MovieDetails'>>()
  const id = route.params.id;

  const favourites = useAppSelector(getFavourites);
  const dispatch = useAppDispatch();

  const { data: movie } = useGetMovieDetailsQuery({ id: id })

  function toggleFavourite(value: boolean) {
    if (value) {
      dispatch(addToFavourite(id));
    } else {
      dispatch(removeFromFavourite(id));
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'white'} barStyle={Platform.OS == 'ios' ? 'light-content' : 'dark-content'} />
      <Image
        source={{ uri: `${IMAGE_BASE_URL}/${movie?.backdrop_path}` }}
        style={styles.cover}
      />
      <View style={[styles.overlay, { backgroundColor: colors.background }]} />
      <View style={styles.view}>
        <AppBar
          action={<IconButton
            color={colors.background}
            icon={<HeartIcon filled={favourites.includes(movie?.id ?? 0)} color={colors.primary} />}
            onPress={() => toggleFavourite(!favourites.includes(movie?.id ?? 0))}
          />}
        />
        <Details id={id} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    height: '55%'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
    opacity: 0.25,
  },
  view: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    borderRadius: 15,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.1,
    shadowRadius: 50,
    shadowOffset: { width: 0, height: -100 }
  },
});

export default MovieDetailsScreen;