import { useTheme } from "@react-navigation/native";
import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import Button from "./Button";

const Message: FC<({ text: string, onPress?: (e: any) => void })> = (props) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.message, { color: colors.text }]}>{props.text}</Text>
      {props.onPress && <Button title={"Refresh"} onPress={props.onPress} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  message: {
    fontSize: 14,
    fontWeight: '500',
    opacity: 0.5,
    paddingBottom: 10,
  }
});

export default Message;