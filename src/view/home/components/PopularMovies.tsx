import { FlatList, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { apiSlice, useGetPopularMoviesQuery } from "../../../redux/slices/api";
import { addToFavourite, getFavourites, getPage, removeFromFavourite, setPage } from "../../../redux/slices/app";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../../navigation/navigation";
import MovieCard from "../../../components/MovieCard";
import Message from "../../../components/Message";
import Loading from "../../../components/Loading";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const PopularMovies = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  const page = useAppSelector(getPage);
  const favourites = useAppSelector(getFavourites);

  const dispatch = useAppDispatch();

  const {
    data: popularMovies = [],
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetPopularMoviesQuery({ page: page, language: 'en-US' })

  function loadMore() {
    dispatch(setPage(page + 1));
    dispatch(apiSlice.endpoints.getPopularMovies.initiate({ page: page + 1, language: 'en-US' }))
  }

  function toggleFavourite(id: number, value: boolean) {
    if (value) {
      dispatch(addToFavourite(id));
    } else {
      dispatch(removeFromFavourite(id));
    }
  }


  if (isFetching && page == 1) {
    return (
      <Loading />
    );
  }

  if (isError) {
    return (
      <Message
        text={(error as FetchBaseQueryError).data?.toString() ?? 'Error while fetching data'}
        onPress={refetch}
      />
    );
  }

  if (isSuccess && popularMovies.length == 0) {
    return (
      <Message text="No Movies Found" />
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={popularMovies}
      renderItem={render => <MovieCard
        movie={render.item}
        onPress={() => navigation.navigate('MovieDetails', { id: render.item.id })}
        isFavourite={favourites.includes(render.item.id)}
        onToggleFavourite={(value) => toggleFavourite(render.item.id, value)}
      />}
      keyExtractor={item => item.id.toString()}
      onEndReached={!isFetching ? loadMore : undefined}
      ListFooterComponent={<Loading />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  }
});

export default PopularMovies;