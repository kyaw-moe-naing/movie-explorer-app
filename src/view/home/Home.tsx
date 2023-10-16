import { FlatList, StyleSheet, View } from "react-native";
import Header from "./components/Header";
import MovieCard from "../../components/MovieCard";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigation/navigation";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { addToFavourite, getError, getFavourites, getMovies, getPage, getPopularMovies, getListUIStatus, getTab, getUpcomingMovies, removeFromFavourite, setPage } from "../../redux/slices/app";
import { Tab, UIStatus } from "../../util/constants";
import Loading from "../../components/Loading";
import { useEffect, useState } from "react";
import Message from "../../components/Message";

const HomeScreen = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  const status = useAppSelector(getListUIStatus);
  const movies = useAppSelector(getMovies);
  const error = useAppSelector(getError);

  const tab = useAppSelector(getTab);
  const page = useAppSelector(getPage);

  const favourites = useAppSelector(getFavourites);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch(1)
  }, []);

  function fetch(page: number) {
    switch (tab) {
      case Tab.UPCOMING:
        dispatch(getUpcomingMovies(page));
        break;
      case Tab.POPULAR:
        dispatch(getPopularMovies(page));
        break;
    }
  }

  function loadMore() {
    dispatch(setPage(page + 1));
    fetch(page + 1);
  }

  function toggleFavourite(id: number, value: boolean) {
    if (value) {
      dispatch(addToFavourite(id));
    } else {
      dispatch(removeFromFavourite(id));
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      {status == UIStatus.LOADING ?
        <Loading /> :
        status == UIStatus.FAILED ?
          <Message
            text={error ?? 'Error while fetching data'}
            onPress={() => fetch(page)}
          /> :
          movies.length == 0 ?
            <Message text="No Movies Found" /> :
            <FlatList
              contentContainerStyle={styles.list}
              data={movies}
              renderItem={render => <MovieCard
                movie={render.item}
                onPress={() => navigation.navigate('MovieDetails', { id: render.item.id })}
                isFavourite={favourites.includes(render.item.id)}
                onToggleFavourite={(value) => toggleFavourite(render.item.id, value)}
              />}
              keyExtractor={item => item.id.toString()}
              onEndReached={loadMore}
            />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  }
});

export default HomeScreen;