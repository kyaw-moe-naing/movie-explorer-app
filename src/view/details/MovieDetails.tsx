import { Image, ScrollView, StatusBar, StyleSheet, Text, View } from "react-native"
import AppBar from "../../components/AppBar";
import { RouteProp, useRoute, useTheme } from "@react-navigation/native";
import Info from "./components/Info";
import Cast from "./components/Cast";
import { useEffect, useState } from "react";
import { addToFavourite, getError, getFavourites, getMovie, getMovieDetails, getListUIStatus, removeFromFavourite, getDetailsUIStatus } from "../../redux/slices/app";
import { Movie } from "../../models/movie";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { UIStatus, image_base_uri } from "../../util/constants";
import Loading from "../../components/Loading";
import Message from "../../components/Message";
import { RootStackParamList } from "../../navigation/navigation";
import Moment from 'moment';
import IconButton from "../../components/IconButton";
import { HeartIcon } from "../../components/Icons";

const MovieDetailsScreen = () => {
  const { colors } = useTheme();

  const route = useRoute<RouteProp<RootStackParamList, 'MovieDetails'>>()
  const id = route.params.id;

  const status = useAppSelector(getDetailsUIStatus);
  const movie = useAppSelector(getMovie);
  const error = useAppSelector(getError);

  const favourites = useAppSelector(getFavourites);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchAPI();
  }, []);

  async function fetchAPI() {
    dispatch(getMovieDetails(id));
  }

  function toggleFavourite(value: boolean) {
    if (value) {
      dispatch(addToFavourite(id));
    } else {
      dispatch(removeFromFavourite(id));
    }
  }

  const Header = () => {
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{movie?.title}</Text>
        <Text style={[styles.info, { color: colors.text }]}>{movie?.genres.map((genre) => genre.name).join(', ')}</Text>
      </View>
    );
  }

  const InfoRow = () => {
    const year: number = Moment(movie?.release_date).year();

    const hour: number = Math.floor((movie?.runtime ?? 0) / 60);
    const min: number = (movie?.runtime ?? 0) % 60;

    return (
      <View style={styles.row}>
        <Info title={year.toString()} info={"Release"} />
        <Info title={min == 0 ? `${hour}h` : `${hour}h ${min}min`} info={"Duration"} />
        <Info title={`${((movie?.vote_average ?? 0) * 10).toFixed(0)}%`} info={"Score"} />
      </View>
    );
  }

  const Overview = () => {
    return (
      <View style={styles.subContainer}>
        <Text style={[styles.label, { backgroundColor: colors.background, paddingBottom: 10 }]}>Overview</Text>
        <Text style={[styles.text, { backgroundColor: colors.background }]}>{movie?.overview}</Text>
      </View>
    );
  }

  const Casts = () => {
    return (
      <View style={styles.subContainer}>
        <Text style={[styles.label, { backgroundColor: colors.background }]}>Casts</Text>
        <ScrollView horizontal contentContainerStyle={styles.list}>
          {movie?.cast.slice(0, 10).map((cast) => <Cast key={cast.id} cast={cast} />)}
        </ScrollView>
      </View>
    );
  }

  if (!movie || status == UIStatus.LOADING) {
    return (
      <Loading />
    );
  }

  if (status == UIStatus.FAILED) {
    return (
      <Message
        text={error ?? 'Error while fetching data'}
        onPress={fetch}
      />
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle='light-content' />
      <Image
        source={{ uri: `${image_base_uri}/${movie.backdrop_path}` }}
        style={styles.cover}
      />
      <View style={[styles.overlay, { backgroundColor: colors.background }]} />
      <View style={styles.view}>
        <AppBar
          action={<IconButton
            color={colors.background}
            icon={<HeartIcon filled={favourites.includes(movie.id)} color={colors.primary} />}
            onPress={() => toggleFavourite(!favourites.includes(movie.id))}
          />}
        />
        <ScrollView contentContainerStyle={{ paddingTop: 200 }}>
          <View style={[styles.content, { backgroundColor: colors.background }]}>
            <Header />
            <InfoRow />
            <Text style={[styles.tagline, { color: colors.text }]}>{movie.tagline}</Text>
            <Overview />
            <Casts />
          </View>
          <View style={[styles.floating, { backgroundColor: colors.background }]}>
            <Image
              source={{ uri: `${image_base_uri}/${movie.poster_path}` }}
              style={styles.poster}
            />
          </View>
        </ScrollView>
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
  poster: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  floating: {
    borderRadius: 8,
    position: 'absolute',
    top: 125,
    alignSelf: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 5,
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
  header: {
    paddingTop: 75,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  info: {
    opacity: 0.5,
    fontWeight: '400',
    paddingTop: 5,
    paddingBottom: 10,
  },
  subContainer: {
    width: '100%',
    paddingVertical: 10,
  },
  tagline: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 14,
    paddingHorizontal: 20,
  },
  list: {
    paddingHorizontal: 15,
    paddingVertical: 10
  }
});

export default MovieDetailsScreen;