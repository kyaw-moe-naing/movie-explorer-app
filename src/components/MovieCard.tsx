import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, Image, Text, TouchableOpacity } from "react-native"
import IconButton from "./IconButton";
import { HeartIcon } from "./Icons";
import { Movie } from "../models/movie";
import Moment from 'moment';
import { image_base_uri } from "../util/constants";

interface MovieCardProps {
  movie: Movie;
  onPress: (e: any) => void;
  isFavourite: boolean;
  onToggleFavourite: (value: boolean) => void;
}

const MovieCard = (props: MovieCardProps) => {
  const { colors } = useTheme();

  const { movie, onPress } = props;

  const date: string = Moment(movie.release_date).format('MMM DD, yyyy');

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}
      onPress={onPress}>
      <Image
        source={{ uri: `${image_base_uri}/${movie.backdrop_path}` }}
        style={styles.cover}
      />
      <View style={[styles.overlay, { backgroundColor: colors.background }]} />
      <View style={[styles.floating, { backgroundColor: colors.background }]}>
        <Image
          source={{ uri: `${image_base_uri}/${movie.poster_path}` }}
          style={styles.poster}
        />
      </View>
      <View style={[styles.row, styles.padding]}>
        <View style={styles.content}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={[styles.info, { color: colors.text }]}>{date}</Text>
        </View>
        <IconButton
          color={colors.border}
          icon={<HeartIcon filled={props.isFavourite} color={colors.primary} />}
          onPress={() => props.onToggleFavourite(!props.isFavourite)}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  cover: {
    height: 200,
    borderRadius: 15,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: 200,
    borderRadius: 15,
    opacity: 0.25,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  padding: {
    paddingTop: 10,
  },
  content: {
    flex: 1,
    marginRight: 15,
  },
  poster: {
    width: 70,
    height: 100,
    borderRadius: 8,
  },
  floating: {
    borderRadius: 8,
    position: 'absolute',
    top: 50,
    left: 20,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  info: {
    opacity: 0.5,
    fontWeight: '400',
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    opacity: 0.3,
    marginHorizontal: 5
  }
});

export default MovieCard;