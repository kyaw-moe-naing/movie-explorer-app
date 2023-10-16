import { useTheme } from "@react-navigation/native";
import { StyleSheet, View } from "react-native";
import Spinner from "react-native-spinkit";

const Loading = () => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Spinner
        size={50}
        type="ChasingDots"
        color={colors.primary}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Loading;