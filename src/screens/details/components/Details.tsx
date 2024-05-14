import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import Loading from "components/Loading";
import Message from "components/Message";
import React from "react";
import { ScrollView, View, Text, Image, StyleSheet } from "react-native";
import { IMAGE_BASE_URL } from "utils/constants";
import Casts from "./Casts";
import { useGetCastsFromMovieQuery, useGetMovieDetailsQuery } from "app/services/movie/movie";
import Info from "components/Info";
import moment from "moment";
import { MovieModel } from "types/models/movie";
import { useTheme } from "@react-navigation/native";

const InfoRow = (props: { movie: MovieModel }) => {
  const year: number = moment(props.movie.release_date).year();

  const hour: number = Math.floor((props.movie.runtime ?? 0) / 60);
  const min: number = (props.movie.runtime ?? 0) % 60;

  return (
    <View style={styles.row}>
      <Info title={year.toString()} info={"Release"} />
      <Info title={min == 0 ? `${hour}h` : `${hour}h ${min}min`} info={"Duration"} />
      <Info title={`${((props.movie.vote_average ?? 0) * 10).toFixed(0)}%`} info={"Score"} />
    </View>
  );
}

function Details(props: { id: number }) {
  const { colors } = useTheme();

  const {
    data: movie,
    isFetching,
    isError,
    error,
  } = useGetMovieDetailsQuery({ id: props.id })

  const { data: casts = [] } = useGetCastsFromMovieQuery({ id: props.id })

  if (!movie || isFetching) {
    return (
      <Loading />
    );
  }

  if (isError) {
    return (
      <Message
        text={(error as FetchBaseQueryError).data?.toString() ?? 'Error while fetching data'}
        onPress={fetch}
      />
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingTop: 200 }}>
      <View style={[styles.content, { backgroundColor: colors.background }]}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>{movie.title}</Text>
          <Text style={[styles.info, { color: colors.text }]}>{movie.genres.map((genre) => genre.name).join(', ')}</Text>
        </View>

        <InfoRow movie={movie} />
        <Text style={[styles.tagline, { color: colors.text }]}>{movie.tagline}</Text>

        <View style={styles.subContainer}>
          <Text style={[styles.label, { color: colors.text, paddingBottom: 10 }]}>Overview</Text>
          <Text style={[styles.text, { color: colors.text }]}>{movie?.overview}</Text>
        </View>

        <Casts casts={casts ?? []} />
      </View>
      <View style={[styles.floating, { backgroundColor: colors.background }]}>
        <Image
          source={{ uri: `${IMAGE_BASE_URL}/${movie.poster_path}` }}
          style={styles.poster}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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

export default Details