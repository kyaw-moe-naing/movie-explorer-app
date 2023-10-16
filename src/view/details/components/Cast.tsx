import { StyleSheet, Text, View } from "react-native";
import Avatar from "../../../components/Avatar";
import { useTheme } from "@react-navigation/native";
import { Cast } from "../../../models/cast";
import { image_base_uri } from "../../../util/constants";

interface CastProps {
  cast: Cast;
}

const CastComponent = (props: CastProps) => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <Avatar uri={`${image_base_uri}/${props.cast.profile_path}`} />
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