import { useTheme } from '@react-navigation/native';
import { ReactNode } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface IconButtonProps {
  selected?: boolean;
  icon: ReactNode;
  color?: string;
  onPress?: (e: any) => void;
}

const IconButton = (props: IconButtonProps) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: props.color ?? colors.primary }]}
      onPress={props.onPress}
    >
      {props.icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default IconButton;