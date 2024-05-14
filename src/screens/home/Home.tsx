import { StyleSheet, View } from "react-native";
import Header from "./components/Header";
import { Tab } from "utils/constants";
import UpcomingMovies from "./components/UpcomingMovies";
import PopularMovies from "./components/PopularMovies";
import { createRef, useState } from "react";
import PagerView from "react-native-pager-view";

const HomeScreen = () => {
  const tabs = [Tab.UPCOMING, Tab.POPULAR];
  const [tab, setTab] = useState<Tab>(Tab.UPCOMING)

  const ref = createRef<PagerView>()

  const onChange = (value: Tab) => {
    setTab(value);
    ref.current?.setPage(tabs.indexOf(value))
  }

  return (
    <View style={styles.container}>
      <Header
        tabs={tabs}
        tab={tab}
        onChange={onChange}
      />
      <PagerView scrollEnabled={false} ref={ref} >
        <UpcomingMovies />
        <PopularMovies />
      </PagerView>
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