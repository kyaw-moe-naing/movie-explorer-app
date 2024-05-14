import { FlatList, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "app/hook";
import { addToFavourite, getFavourites, removeFromFavourite } from "app/slices/app";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "navigation/containers/app";
import MovieCard from "components/MovieCard";
import Loading from "components/Loading";
import Message from "components/Message";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useGetUpcomingMoviesQuery } from "app/services/movie/movie";
import { useState } from "react";

const UpcomingMovies = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList, 'Home'>>();

  const [page, setPage] = useState<number>(0);
  const favourites = useAppSelector(getFavourites);

  const dispatch = useAppDispatch();

  const {
    data: upcomingMovies = [],
    isFetching,
    isSuccess,
    isError,
    error,
    refetch
  } = useGetUpcomingMoviesQuery({ page: page })

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

  if (isSuccess && upcomingMovies.length == 0) {
    return (
      <Message text="No Movies Found" />
    );
  }

  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={upcomingMovies}
      renderItem={render => <MovieCard
        movie={render.item}
        onPress={() => navigation.navigate('MovieDetails', { id: render.item.id })}
        isFavourite={favourites.includes(render.item.id)}
        onToggleFavourite={(value) => toggleFavourite(render.item.id, value)}
      />}
      keyExtractor={item => item.id.toString()}
      onEndReached={!isFetching ? () => setPage(page + 1) : undefined}
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

export default UpcomingMovies;