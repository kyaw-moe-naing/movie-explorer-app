
import { NavigationContainer, useTheme } from "@react-navigation/native";
import { StatusBar, StyleSheet, View } from 'react-native';
import AppTheme from '../theme/theme';
import { routes } from './routes';
import { createStackNavigator } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import LoginScreen from "../view/login/Login";
import Spinner from "react-native-spinkit";
import Loading from "../components/Loading";

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  MovieDetails: { id: number };
};

const Navigation = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  useEffect(() => {
    auth().onAuthStateChanged(userState => {
      setUser(userState);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  return (
    <NavigationContainer theme={AppTheme}>
      <StatusBar barStyle="dark-content" />
      {loading ?
        <Loading />
        :
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {user ?
            routes.map((route) => <Stack.Screen
              key={route.name}
              name={route.name}
              component={route.component}
            />)
            :
            <Stack.Screen
              name={'Login'}
              component={LoginScreen}
              options={{
                presentation: 'modal'
              }}
            />}
        </Stack.Navigator>}
    </NavigationContainer>
  );
}

export default Navigation;