
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Loading from "components/Loading";
import { routes } from "navigation/routes";
import { useState, useEffect } from "react";
import { StatusBar } from 'react-native';
import LoginScreen from "screens/login/Login";
import AppTheme from "src/theme/theme";
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const Stack = createStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  MovieDetails: { id: number };
};

const AppContainer = () => {
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
      <StatusBar backgroundColor={'white'} barStyle="dark-content" />
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

export default AppContainer;