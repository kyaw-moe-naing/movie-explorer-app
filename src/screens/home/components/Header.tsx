import { useTheme } from "@react-navigation/native";
import Avatar from "components/Avatar";
import IconButton from "components/IconButton";
import { MenuIcon } from "components/Icons";
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { Tab } from "utils/constants";
import auth from '@react-native-firebase/auth'
import Button from "components/Button";

interface HeaderProps {
  tabs: Tab[];
  tab: Tab;
  onChange: (tab: Tab) => void;
}

const Header = (props: HeaderProps) => {
  const { colors } = useTheme();

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
        {props.tabs.map((t) => <Button
          key={t}
          disabled={props.tab == t}
          selected={props.tab == t}
          title={t}
          onPress={() => props.onChange(t)}
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