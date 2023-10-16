import { View } from "react-native";
import { Path, Svg } from "react-native-svg";

interface IconProps {
  color?: string;
  filled?: boolean;
}

export const MenuIcon = (props: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
      <Path d="M17 10H19C21 10 22 9 22 7V5C22 3 21 2 19 2H17C15 2 14 3 14 5V7C14 9 15 10 17 10Z" stroke={props.color ?? 'black'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M5 22H7C9 22 10 21 10 19V17C10 15 9 14 7 14H5C3 14 2 15 2 17V19C2 21 3 22 5 22Z" stroke={props.color ?? 'black'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M6 10C8.20914 10 10 8.20914 10 6C10 3.79086 8.20914 2 6 2C3.79086 2 2 3.79086 2 6C2 8.20914 3.79086 10 6 10Z" stroke={props.color ?? 'black'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M18 22C20.2091 22 22 20.2091 22 18C22 15.7909 20.2091 14 18 14C15.7909 14 14 15.7909 14 18C14 20.2091 15.7909 22 18 22Z" stroke={props.color ?? 'black'} stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
}

export const HeartIcon = (props: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill={props.filled ? props.color ?? 'white' : "none"}>
      <Path d="M12.62 20.81C12.28 20.93 11.72 20.93 11.38 20.81C8.48 19.82 2 15.69 2 8.68998C2 5.59998 4.49 3.09998 7.56 3.09998C9.38 3.09998 10.99 3.97998 12 5.33998C13.01 3.97998 14.63 3.09998 16.44 3.09998C19.51 3.09998 22 5.59998 22 8.68998C22 15.69 15.52 19.82 12.62 20.81Z" stroke={props.color ?? 'white'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
}

export const BackIcon = (props: IconProps) => {
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none" >
      <Path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke={props.color ?? 'white'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <Path d="M13.26 15.53L9.73999 12L13.26 8.46997" stroke={props.color ?? 'white'} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </Svg>
  );
}