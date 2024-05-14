import { useTheme } from "@react-navigation/native";
import Cast from "components/Cast";
import { View, Text, ScrollView, StyleSheet, FlatList } from "react-native";
import { CastModel } from "types/models/cast";

interface CastsProps {
  casts: CastModel[];
}

function Casts(props: CastsProps) {
  const { colors } = useTheme();

  if (props.casts.length == 0) return;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: colors.text }]}>Casts</Text>
      <FlatList
        contentContainerStyle={styles.list}
        data={props.casts}
        renderItem={item => <Cast cast={item.item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingHorizontal: 20,
  },
  list: {
    paddingHorizontal: 15,
    paddingVertical: 10
  }
});

export default Casts