import { useTheme } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native"

const Info: FC<({ title: string; info: string; })> = (props) => {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Text style={[styles.title, { color: colors.text }]}>{props.title}</Text>
      <Text style={[styles.info, { color: colors.text }]}>{props.info}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 5,
    width: 100,
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 5,
  },
  info: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.5
  }
});

export default Info;