import { SafeAreaView, StyleSheet, View } from "react-native"
import Avatar from "./Avatar";
import IconButton from "./IconButton";
import { BackIcon, HeartIcon } from "./Icons";
import { useNavigation, useTheme } from "@react-navigation/native";
import { ReactNode } from "react";

interface AppBarProps {
  action: ReactNode;
}

const AppBar = (props: AppBarProps) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <IconButton
          color={colors.background}
          icon={<BackIcon color={colors.text} />}
          onPress={() => navigation.goBack()}
        />
        {props.action}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});

export default AppBar;