import { useTheme } from '@react-navigation/native';
import { View, Text, TouchableOpacity, StyleSheet, DimensionValue } from 'react-native';
import Spinner from 'react-native-spinkit';

interface ButtonProps {
  width?: DimensionValue;
  height?: DimensionValue;
  disabled?: boolean;
  loading?: boolean;
  selected?: boolean;
  title: string;
  onPress?: (e: any) => void;
}

const Button = (props: ButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={props.loading || props.disabled ? 1 : 0}
      style={[
        styles.container,
        {
          backgroundColor: props.selected ? colors.primary : colors.border,
          width: props.width ?? undefined,
          height: props.height ?? 30,
          opacity: props.loading ? 0.5 : 1
        }
      ]}
      onPress={props.loading || props.disabled ? undefined : props.onPress}
    >
      {props.loading ?
        <View style={{ flex: 1 }}>
          <Spinner
            size={30}
            type='ThreeBounce'
            color={props.selected ? colors.background : colors.text}
          />
        </View>
        :
        <Text style={[styles.title, { color: props.selected ? colors.background : colors.text }]}>
          {props.title}
        </Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Button;