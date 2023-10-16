import { useTheme } from "@react-navigation/native";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Avatar from "../../../components/Avatar";
import { MenuIcon } from "../../../components/Icons";
import IconButton from "../../../components/IconButton";
import auth from '@react-native-firebase/auth';
import { Tab } from "../../../util/constants";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getMovies, getPage, getPopularMovies, getTab, getUpcomingMovies, setTab } from "../../../redux/slices/app";

const Header = () => {
  const { colors } = useTheme();

  const tab = useAppSelector(getTab);
  const dispatch = useAppDispatch();

  function changeTab(newTab: Tab) {
    dispatch(setTab(newTab));
    switch (newTab) {
      case Tab.UPCOMING:
        dispatch(getUpcomingMovies(1));
        break;
      case Tab.POPULAR:
        dispatch(getPopularMovies(1));
        break;
    }
  }

  function logout() {
    Alert.alert(
      'Are you sure you want to logout?',
      '',
      [
        {
          text: 'Cancel',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => auth().signOut(),
          style: 'default',
        },
      ],
    )
  }

  return (
    <SafeAreaView>
      <View style={styles.appBar}>
        <IconButton
          color={colors.border}
          icon={<MenuIcon />}
          onPress={() => { }}
        />
        <Avatar
          uri={auth().currentUser?.photoURL ?? "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50"}
          onPress={logout}
        />
      </View>

      <Text style={[styles.title, { color: colors.text }]}>{auth().currentUser?.displayName ? `Welcome, ${auth().currentUser?.displayName}` : 'Discover'}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={styles.list}
      >
        {[Tab.UPCOMING, Tab.POPULAR].map((t) => <Button
          key={t}
          disabled={tab == t}
          selected={tab == t}
          title={t}
          onPress={() => changeTab(t)}
        />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  appBar: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    fontSize: 28,
    fontWeight: '500',
    paddingHorizontal: 20,
  },
  list: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  }
});

export default Header;