import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import { useAppSelector } from "../../redux/hook";
import { getTab } from "../../redux/slices/app";
import { Tab } from "../../util/constants";
import UpcomingMovies from "./components/UpcomingMovies";
import PopularMovies from "./components/PopularMovies";

const HomeScreen = () => {
  const tab = useAppSelector(getTab);

  return (
    <View style={styles.container}>
      <Header />
      {tab == Tab.UPCOMING ? <UpcomingMovies /> : <PopularMovies />}
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