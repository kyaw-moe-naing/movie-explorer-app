import { useTheme } from "@react-navigation/native";
import Avatar from "components/Avatar";
import { View, Text, StyleSheet } from "react-native";
import { IMAGE_BASE_URL } from "utils/constants";
import { CastModel } from "types/models/cast";

interface CastProps {
  cast: CastModel;
}

const CastComponent = (props: CastProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Avatar uri={`${IMAGE_BASE_URL}/${props.cast.profile_path}`} />
      <Text style={[styles.name, { color: colors.text }]}>{props.cast.name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    alignItems: 'center'
  },
  name: {
    fontSize: 12,
    opacity: 0.5,
    paddingTop: 10,
    textAlign: 'center'
  }
});

export default CastComponent;