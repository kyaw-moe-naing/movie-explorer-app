import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import React from 'react';

interface AvatarProps {
  uri: string,
  onPress?: (e: any) => void;
}

const Avatar = (props: AvatarProps) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Image source={{ uri: props.uri }} style={styles.avatar} />
    </TouchableOpacity>
  );
}


const styles = StyleSheet.create({
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  }
});

export default Avatar;